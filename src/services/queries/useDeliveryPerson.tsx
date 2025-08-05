import { DeliveryPersonDTO } from "@/dtos/deliveryPersonDTO";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";


async function getDeliveryPerson(id: string): Promise<DeliveryPersonDTO> {
    const { data } = await api.get('/api/delivery-people/', { params: { id } })

    return data
}
export function useDeliveryPerson(id: string) {
    return useQuery<DeliveryPersonDTO, Error>({
        queryKey: ['delivery-person', id],
        queryFn: () => getDeliveryPerson(id),
        enabled: !!id,
    });
}