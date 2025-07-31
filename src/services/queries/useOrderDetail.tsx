import { OrderDTO } from "@/dtos/orderDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


async function getOrders(orderId: string): Promise<OrderDTO> {
    const { data } = await api.get(`/api/orders/${orderId}`)
    return data
}
export function useOrderDetail(orderId: string) {
    return useQuery({
        queryKey: [`orders-${orderId}`],
        queryFn: () => getOrders(orderId)
    })
}
