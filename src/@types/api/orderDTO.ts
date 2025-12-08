enum orderStatus {
  "preparing",
  "on_the_way",
  "delivered",
}

export interface OrderDTO {
  id: number;
  company_id: number;
  customer_id: number;
  delivery_person_id: number;
  date: Date;
  status: orderStatus;
  total: number;
}

export interface OrderItemDTO {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}
