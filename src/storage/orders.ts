import { OrderDTO } from "@/dtos/orderDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CustomerOrderType = {
  orders: OrderDTO[];
  createOrder: (newOrder: OrderDTO) => void;
};
export const useCustomerOrders = create<CustomerOrderType>()(
  persist(
    (set, get) => ({
      orders: [] as OrderDTO[],
      createOrder: (newOrder: OrderDTO) => {
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
