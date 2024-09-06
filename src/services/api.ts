import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, TIMEOUT } from "@/utils/config";
import { getIsPersistent } from "@/utils/sessionManager";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

const getSessionData = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const setSessionData = (data: any) => {
  localStorage.setItem("user", JSON.stringify(data));
};

const addAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const sessionData = getSessionData();
    const token = sessionData?.state?.login?.data?.accessToken;
    addAuthorizationHeader(config, token);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPersistent = getIsPersistent();

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      isPersistent
    ) {
      originalRequest._retry = true;
      const sessionData = getSessionData();
      const refreshToken = sessionData?.state?.login?.data?.refreshToken;

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}/account/refresh-token`,
          {
            token: refreshToken,
          }
        );
        const newAccessToken = response?.data?.accessToken;
        sessionData.state.login.data.accessToken = newAccessToken;
        setSessionData(sessionData);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
