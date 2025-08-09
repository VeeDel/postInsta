// services/api/axiosInstance.ts
import { useAuthStore } from "@/store/authStore/authStore";
import axios from "axios";
import Router from "next/router"; // For navigation on client side

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token from store
      useAuthStore.getState().clearToken?.(); // optional if you have a logout method
      // Redirect to login page
      if (typeof window !== "undefined") {
        Router.push("/entry");
      }
    }
    return Promise.reject(error);
  }
);
