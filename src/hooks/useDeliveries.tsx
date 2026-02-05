import { useAuth } from "@/contexts/Auth";
import { createDeliveryOrdersStore } from "@/storage/deliverOrders";

const stores = new Map<number, ReturnType<typeof createDeliveryOrdersStore>>();
export function useDeliveriesStore() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!stores.has(user.userId)) {
    stores.set(user.userId, createDeliveryOrdersStore(user.userId));
  }

  return stores.get(user.userId)!;
}
