import { OrderDTO } from "@/@types/api/orderDTO";
import { Order } from "@/@types/models/order";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOrder(orderId: string): Promise<Order> {
  const { data } = await api.get<OrderDTO>(`/api/orders/${orderId}`);

  const order: Order = {
    id: data.id,
    companyId: data.company_id,
    customerId: data.customer_id,
    date: data.date,
    deliveryPersonId: data.delivery_person_id,
    status: data.status,
    total: data.total,
  };

  return order;
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: [`orders-${orderId}`],
    queryFn: () => getOrder(orderId),
  });
}
