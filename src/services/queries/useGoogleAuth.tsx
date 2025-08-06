import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface googleLoginParams {
    auth_token: string,
    device_type?: string
}

async function googleAuth({ auth_token }: googleLoginParams) {
    const { data } = await api.post('/api/auth/social/google/',
        {
            auth_token,
            device_type: "mobile"
        })

    return data
}

export function useGoogleAuth() {
    return useMutation({
        mutationKey: ['auth-google'],
        mutationFn: googleAuth
    })
}