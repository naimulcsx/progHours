import { IconAlertCircle } from "@tabler/icons-react";
import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import React from "react";

import { notifications } from "@mantine/notifications";

import { storage } from "./storage";

export const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.proghours.com/api/v1"
      : "http://localhost:3333/api/v1"
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
      if (error?.response?.status === 417) {
        storage.clearToken();
        window.location.reload();
        return;
      }
      console.log(error?.response?.data);
      // show alert messages through mantine notifications
      notifications.show({
        icon: React.createElement(IconAlertCircle),
        color: "red",
        title: error?.response?.data?.error,
        message: error?.response?.data?.message
      });
    }
    return Promise.reject(error);
  }
);
