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

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const sessionData = getSessionData();
        const newAccessToken = sessionData?.state?.login?.data?.accessToken;

        if (newAccessToken) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          addAuthorizationHeader(originalRequest, newAccessToken);
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
