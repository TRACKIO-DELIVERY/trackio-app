// Aqui gerencia os pedidos aceitos pelo entregador

import { Order } from "@/@types/models/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DeliveryOrdersType = {
  orders: Order[];
  accepetOrder: (order: Order) => void;
  cancelOrder: (orderId: number) => void;
  clearDeliveries: () => void;
};

export const useDeliveryOrdersStore = create<DeliveryOrdersType>()(
  persist(
    (set, get) => ({
      orders: [] as Order[],
      accepetOrder: (order: Order) => {
        set(() => ({
          orders: [...get().orders, order],
        }));
      },
      cancelOrder: (orderId: number) => {
        set(() => ({
          orders: get().orders.filter((order) => order.id != orderId),
        }));
      },
      clearDeliveries: () => {
        set(() => ({
          orders: [] as Order[],
        }));
      },
    }),
    {
      name: "@trackio::delivery-orders",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
