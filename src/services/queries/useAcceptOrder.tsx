import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

interface orderParams {
  orderId: number;
  deliveryId: number;
}
async function acceptOrder(params: orderParams) {
  const { data } = await api.patch("orders/in_route", params);
  return data;
}
export function useAcceptOrder(orderId: number) {
  return useMutation({
    mutationKey: [`order-delivery-${orderId}`],
    mutationFn: acceptOrder,
  });
}
