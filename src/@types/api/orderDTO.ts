export type orderStatus = "IN_PROGRESS" | "ON_ROUTE" | "DELIVERED";

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
  payment: {
    id: 1;
    orderId: number;
    paymentMethod: "PIX" | "CARD";
    amount: number;
    paymentDate: string;
  };
}

export interface OrderItemDTO {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderDTO {
  companyId: number;
  customerId: number;
  items: CreateOrdemItemDTO[];
  payment: {
    paymentMethod: "PIX" | "CARD";
  };
}

export interface CreateOrdemItemDTO {
  productId: number;
  quantity: number;
}
