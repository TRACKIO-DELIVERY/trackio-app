import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { LoginParams, LoginResponse } from "@/@types/authParams";

async function login(params: LoginParams) {
  const { data } = await api.post("/api/token/", params);

  return data;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginParams>({
    mutationKey: ["user-login"],
    mutationFn: login,
  });
}
