import { OrderDTO } from "@/@types/api/orderDTO";
import { Order } from "@/@types/models/order";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOrders(): Promise<Order[]> {
  const { data } = await api.get<OrderDTO[]>("/orders/");

  const orders: Order[] = data.map((order: OrderDTO) => ({
    id: order.id,
    orderStatus: order.orderStatus,
    companyId: order.companyId,
    companyName: order.companyName,
    customerId: order.customerId,
    customerName: order.customerName,
    orderDate: order.orderDate,
    orderAmount: order.orderAmount,
    deliveryPersonId: order.deliveryPersonId,
    items: order.items,
    orderFlee: order.orderFlee,
  }));
  return orders;
}
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
