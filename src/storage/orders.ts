import { Order } from "@/@types/models/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CustomerOrderType = {
  orders: Order[];
  createOrder: (newOrder: Order) => void;
  cancelOrder: (orderId: number) => void;
  clearOrders: () => void;
};
export function createCustomerOrdersStore(userId: number) {
  return create<CustomerOrderType>()(
    persist(
      (set, get) => ({
        orders: [] as Order[],
        createOrder: (newOrder: Order) => {
          set(() => ({
            orders: [...get().orders, newOrder],
          }));
        },
        cancelOrder: (orderId: number) => {
          set(() => ({
            orders: get().orders.filter((order) => {
              order.id !== orderId;
            }),
          }));
        },
        clearOrders: () => set({ orders: [] }),
      }),
      {
        name: `@trackio::customer-orders-${userId}`,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  );
}
