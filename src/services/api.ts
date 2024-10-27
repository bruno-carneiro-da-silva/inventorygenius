import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, TIMEOUT } from "@/utils/config";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

const getSessionData = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

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
    const token = sessionData?.state?.login?.accessToken;
    addAuthorizationHeader(config, token);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
      const token = newAccessToken.split(" ")[1];
      const sessionData = getSessionData();
      sessionData.state.login.accessToken = token;
      setSessionData(sessionData);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      localStorage.removeItem("user");
      window.location.href = "/";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
