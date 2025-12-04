enum orderStatus {
  "preparing",
  "on_the_way",
  "delivered",
}

export interface Order {
  id: number;
  companyId: number;
  customerId: number;
  deliveryPersonId: number;
  date: Date;
  status: orderStatus;
  total: number;
}

export interface OrderItemDTO {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}
