import { useAuth } from "@/contexts/Auth";
import { createCartStore } from "@/storage/cart";

const stores = new Map<number, ReturnType<typeof createCartStore>>();
export function useCartStore() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!stores.has(user.userId)) {
    stores.set(user.userId, createCartStore(user.userId));
  }

  return stores.get(user.userId)!;
}
