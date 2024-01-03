import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "./get-token";

const http: AxiosInstance = axios.create({
  baseURL: "https://api.pythonbdit.com/api",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    const headers: any = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    config.headers = headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
