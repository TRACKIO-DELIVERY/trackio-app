import { AxiosInstance } from "axios";
import { refreshAccessToken } from "@/services/api/refresh";
import {
  getTokensStorage,
  removeTokensStorage,
  setTokensStorage,
} from "@/storage/authTokens";
import { router } from "expo-router";

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
}

export function setupApiInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(async (config: any) => {
    const tokens = await getTokensStorage();
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 || !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const data = await refreshAccessToken();
          const token = data.access_token;

          processQueue(null, token);

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          await removeTokensStorage();
          router.replace("/(auth)/login");
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
}
