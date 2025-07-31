import { OrderDTO } from "@/dtos/orderDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


async function getOrders(orderId: string): Promise<OrderDTO> {
    const { data } = await api.get(`/api/orders/${orderId}`)

    // const order: OrderDTO = {
    //     id: data.id,
    //     email: data.email,
    //     deliveryFee: data.delivery_fee,
    //     establishment: data.establishment,
    //     complementary: {
    //         deliveryNeighborhood: data.complementary_order.delivery_neighborhood,
    //         deliveryStreet: data.complementary_order.delivery_street,
    //         deliveryState: data.complementary_order.delivery_state,
    //         deliveryNumber: data.complementary_order.delivery_number,
    //         deliveryCountry: data.complementary_order.delivery_country,
    //         deliveryCity: data.complementary_order.delivery_city
    //     }
    // }

    return data
}

export function useOrderDetail(orderId: string) {
    return useQuery({
        queryKey: [`orders-${orderId}`],
        queryFn: () => getOrders(orderId)
    })
}
