import { OrderDTO } from "@/@types/api/orderDTO";
import { Order } from "@/@types/models/order";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOrders(): Promise<Order[]> {
  const { data } = await api.get<OrderDTO[]>("/orders/");

  const orders: Order[] = data.map((order: OrderDTO) => ({
    id: order.id,
    status: order.status,
    companyId: order.company_id,
    date: order.date,
    total: order.total,
    customerId: order.customer_id,
    deliveryPersonId: order.delivery_person_id,
    procucts: [],
  }));
  return orders;
}
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
