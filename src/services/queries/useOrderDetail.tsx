import { OrderDTO } from "@/@types/api/orderDTO";
import { Order } from "@/@types/models/order";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOrder(orderId: string): Promise<Order> {
  const { data } = await api.get<OrderDTO>(`/orders/${orderId}/`);
  console.log(data);
  const order: Order = {
    id: data.id,
    companyId: data.company_id,
    customerId: data.customer_id,
    date: data.date,
    deliveryPersonId: data.delivery_person_id,
    status: data.status,
    total: data.total,
    procucts: [],
  };

  return order;
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: [`order-${orderId}`],
    queryFn: () => getOrder(orderId),
  });
}
