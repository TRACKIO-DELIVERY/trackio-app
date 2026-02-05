import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

interface orderParams {
  orderId: number;
}
async function completeOrderDeliver(params: orderParams) {
  const { data } = await api.patch("orders/completed", params);
  return data;
}
export function useCompleteOrderDeliver() {
  return useMutation({
    mutationKey: [`order-complete-delivery`],
    mutationFn: completeOrderDeliver,
  });
}
