import { OrderDTO } from "@/@types/api/orderDTO";
import { Order } from "@/@types/models/order";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getOrder(orderId: string): Promise<Order> {
  const { data } = await api.get<OrderDTO>(`/orders/${orderId}`);

  const order: Order = {
    id: data.id,
    companyId: data.companyId,
    companyName: data.companyName,
    customerId: data.customerId,
    customerName: data.customerName,
    orderDate: data.orderDate,
    deliveryPersonId: data.deliveryPersonId,
    orderStatus: data.orderStatus,
    orderAmount: data.orderAmount,
    orderFlee: data.orderFlee,
    items: data.items,
    payment: data.payment,
  };

  return order;
}

export function useOrderDetail(orderId: string) {
  console.log("AAAAA0,", orderId);
  return useQuery({
    queryKey: [`order-${orderId}`],
    queryFn: () => getOrder(orderId),
  });
}
