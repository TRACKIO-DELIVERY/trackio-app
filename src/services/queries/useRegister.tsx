import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { RegisterParams } from "@/@types/authParams";

async function register(params: RegisterParams) {
  const { data } = await api.post("/api/delivery-people/", params);
  return data;
}
export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });
}
