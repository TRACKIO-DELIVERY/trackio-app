enum orderStatus {
  preparing = 0,
  on_the_way = 1,
  delivered = 2,
}

export interface OrderDTO {
  id: number;
  companyId: number;
  companyName: string;
  customerId: number;
  customerName: string;
  deliveryPersonId?: number;
  orderDate: Date;
  items: OrderItemDTO[];
  orderStatus: orderStatus;
  orderAmount: number;
  orderFlee: number;
}

export interface OrderItemDTO {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}
