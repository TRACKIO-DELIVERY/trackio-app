import { DeliveryMapDetail } from "@/Screens/DeliveryMapDetail";
import { useDeliveryOrdersStore } from "@/storage/deliverOrders";

export default function Screen() {
  const orders = useDeliveryOrdersStore((state) => state.orders);

  return DeliveryMapDetail({ orders, activeOrder: orders[0].id });
}
