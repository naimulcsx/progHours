import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { storage } from "./storage";
import React from "react";

export const axios = Axios.create({
  baseURL: "http://localhost:4200/api/v1"
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
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      notifications.show({
        icon: React.createElement(IconAlertCircle),
        color: "red",
        title: error?.response?.data?.error,
        message: error?.response?.data?.message
      });
    }
    // TODO: show errors through mantine notifications
    return Promise.reject(error);
  }
);
