import Axios, { InternalAxiosRequestConfig } from "axios";
import storage from "./storage";

export const axios = Axios.create({
  baseURL: "http://localhost:3333"
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // TODO: show errors through mantine notifications
    return Promise.reject(error);
  }
);
