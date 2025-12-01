import axios from "axios";
import { applyAuthInterceptors } from "./interceptors";

// baseURL: process.env.EXPO_PUBLIC_API_URL
//baseURL: "http://10.112.5.5:3000",
export const api = axios.create({
  baseURL: "http://10.112.5.5:3000",
});

export const apiNode = axios.create({
  baseURL: process.env.EXPO_PUBLIC_NODE_API_URL,
});

applyAuthInterceptors(api);
//applyAuthInterceptors(apiNode);
