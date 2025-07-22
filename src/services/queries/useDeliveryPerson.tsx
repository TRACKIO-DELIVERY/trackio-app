import { DeliveryPersonDTO } from "@/dtos/deliveryPersonDTO";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function useDeliveryPerson() {
    return useQuery({
        queryKey: ['delivery-person'],

    })
}

const accessToken = 'teste'

async function getDeliveryPerson(): Promise<DeliveryPersonDTO> {
    const { data } = await api.get('/deliveryPerson', {
        params: accessToken
    })

    return data
}