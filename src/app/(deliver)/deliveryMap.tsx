import { useDeliveriesStore } from "@/hooks/useDeliveries";
import { DeliveryMapDetail } from "@/Screens/DeliveryMapDetail";

export default function Screen() {
  const deliveriesStore = useDeliveriesStore();
  if (!deliveriesStore) return null;
  const orders = deliveriesStore((state) => state.orders);

  if (!orders || orders.length === 0) {
    return null;
  }
  return <DeliveryMapDetail orders={orders} activeOrder={orders[0].id} />;
}
