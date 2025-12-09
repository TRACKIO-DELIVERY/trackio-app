import { Product } from "./product";

enum orderStatus {
  "preparing",
  "on_the_way",
  "delivered",
}

export interface Order {
  id: number;
  companyId?: number; //necessario?
  customerId: number;
  deliveryPersonId: number;
  date: Date;
  procucts: Product[]; //por enquanto?
  status: orderStatus;
  total: number;
}

export interface OrderItemDTO {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}
