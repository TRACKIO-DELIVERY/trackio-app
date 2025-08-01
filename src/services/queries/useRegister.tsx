import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface RegisterParams {
    fullname: string,
    email: string,
    password: string,
    bithDate?: string,
    cpf?: string,
    userType: number //3
}

async function register(params: RegisterParams) {
    const { data } = await api.post('/users', params)
    return data
}
export function useRegister() {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: register
    })
}
