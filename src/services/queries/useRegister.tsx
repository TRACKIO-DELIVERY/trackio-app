import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface RegisterParams {
    user: {
        name: string,
        username?: string,
        password: string,
        email: string,
        bith_date?: string,
        user_type: number //3
        cpf?: string,

    }
    availability: string,
    vehicle: string,
    license_plate: string,
}

async function register(params: RegisterParams) {
    const { data } = await api.post('/api/delivery-people/', params)
    return data
}
export function useRegister() {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: register
    })
}
