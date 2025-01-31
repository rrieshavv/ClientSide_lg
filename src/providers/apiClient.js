import axios from "axios";
import { getBackendUrl } from "./Helper";
import { getToken } from "./CookieHandler";

export const apiClient = axios.create({
  baseURL: getBackendUrl(),
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

