import { useAuth } from "@/contexts/Auth";
import { createCustomerOrdersStore } from "@/storage/orders";

const stores = new Map<number, ReturnType<typeof createCustomerOrdersStore>>();
export function useOrdersStore() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!stores.has(user.userId)) {
    stores.set(user.userId, createCustomerOrdersStore(user.userId));
  }

  return stores.get(user.userId)!;
}
