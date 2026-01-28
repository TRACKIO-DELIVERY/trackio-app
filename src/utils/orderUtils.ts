import { orderStatus } from "@/@types/models/order";

export function translateStatus(status: orderStatus) {
  switch (status) {
    case "ON_ROUTE":
      return "A caminho";
    case "DELIVERED":
      return "Entregue";
    default:
      return "Preparando";
  }
}
