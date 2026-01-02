import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export function useAcceptOrder(orderId: number, deliveryPerson: number) {
  return useMutation({
    mutationKey: [`order-delivery-${orderId}`],
    mutationFn: async () => {
      await api.post("accept-delivery", {
        orderId,
        deliveryPerson,
      });
    },
  });
}
