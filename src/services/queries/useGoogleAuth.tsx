import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { googleLoginParams } from "@/@types/authParams";

async function googleAuth({ auth_token }: googleLoginParams) {
  const { data } = await api.post("/api/auth/social/google/", {
    auth_token,
    device_type: "mobile",
  });

  return data;
}

export function useGoogleAuth() {
  return useMutation({
    mutationKey: ["auth-google"],
    mutationFn: googleAuth,
  });
}
