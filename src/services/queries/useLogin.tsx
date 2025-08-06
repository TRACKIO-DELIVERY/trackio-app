import { useMutation } from "@tanstack/react-query"
import { api } from "../api"

export interface LoginParams {
    email: string,
    password: string
}

interface LoginResponse {
    user_id: string,
    access: string,
    refresh: string;
    email: string,
    birthDate: string,
    name: string,
}
async function login(params: LoginParams) {
    const { data } = await api.post('/api/token/', params)

    return data
}

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginParams>({
        mutationKey: ['user-login'],
        mutationFn: login
    })
}