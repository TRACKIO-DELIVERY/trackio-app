import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

interface orderParams {
  orderId: number;
}
async function cancelOrder(params: orderParams) {
  const { data } = await api.patch("orders/cancelled", params);
  return data;
}
export function useCancelOrder() {
  return useMutation({
    mutationKey: [`order-cancelled`],
    mutationFn: cancelOrder,
  });
}
