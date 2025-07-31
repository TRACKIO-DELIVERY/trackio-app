import { OrderDTO } from "@/dtos/orderDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


async function getOrders(): Promise<OrderDTO[]> {
    const { data } = await api.get('/api/orders/')

    const orders: OrderDTO[] = data.map((order: any) => ({
        id: order.id,
        OrderStatus: order.order_status,
        deliveryFee: order.delivery_fee,
        establishment: order.establishment,
        orderStatus: order.order_status,
        fullPickUpAdrress: order.full_pick_up_address,
        fullDeliveryAddress: order.full_delivery_address,
        email: order.email
    }))
    return orders

}
export function useOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    })
}
