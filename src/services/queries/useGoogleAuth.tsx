import { useMutation } from "@tanstack/react-query";
import { api } from "../api";


async function googleAuth(googleToken: string) {
    const { data } = await api.post('/api/google/', { token: googleToken })
    return data
}

export function useGoogleAuth() {
    return useMutation({
        mutationKey: ['auth-google'],
        mutationFn: googleAuth
    })
}