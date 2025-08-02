import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface RegisterParams {
    name: string,
    email: string,
    password: string,
    bith_date?: string,
    username?: string,
    cpf?: string,
    user_type: number //3
}

async function register(params: RegisterParams) {
    const { data } = await api.post('/api/users/', params)
    return data
}
export function useRegister() {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: register
    })
}
