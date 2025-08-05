import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface googleLoginParams {
    auth_token: string,
    user_type: number,
    device_type?: string
}

async function googleAuth({ auth_token, user_type }: googleLoginParams) {
    const { data } = await api.post('/api/auth/social/google/',
        {
            auth_token,
            device_type: "mobile"
        })
    console.log('AAAAAA', data)
    return data
}

export function useGoogleAuth() {
    return useMutation({
        mutationKey: ['auth-google'],
        mutationFn: googleAuth
    })
}