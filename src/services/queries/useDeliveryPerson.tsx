import { DeliveryPersonDTO } from "@/dtos/deliveryPersonDTO";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function useDeliveryPerson(accessToken: string) {
    return useQuery({
        queryKey: ['delivery-person'],
        queryFn: () => getDeliveryPerson(accessToken)
    })
}

async function getDeliveryPerson(accessToken: string): Promise<DeliveryPersonDTO> {
    const { data } = await api.get('/deliveryPerson', {
        params: accessToken
    })

    return data
}