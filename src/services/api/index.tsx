import axios from "axios";
import { applyAuthInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ORDER_BACK,
});

export const apiNode = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SOCKET_URL,
});

//applyAuthInterceptors(api);
