import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Order } from "@/@types/models/order";
import { CreateOrderDTO } from "@/@types/api/orderDTO";

export function useCreateOrder() {
  return useMutation({
    mutationKey: ["order-create"],
    mutationFn: async (order: CreateOrderDTO) => {
      const { data } = await api.post("/orders", order);
      return data;
    },
  });
}
