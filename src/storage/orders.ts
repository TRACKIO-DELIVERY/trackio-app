import { Order } from "@/@types/models/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CustomerOrderType = {
  orders: Order[];
  createOrder: (newOrder: Order) => void;
};
export const useCustomerOrders = create<CustomerOrderType>()(
  persist(
    (set, get) => ({
      orders: [] as Order[],
      createOrder: (newOrder: Order) => {
        set(() => ({
          orders: [...get().orders, newOrder],
        }));
      },
    }),
    {
      name: "@trackio::customer-orders",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
