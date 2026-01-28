export type orderStatus = "IN_PROGRESS" | "ON_ROUTE" | "DELIVERED";

export interface Order {
  id: number;
  companyId: number;
  companyName: string;
  customerId: number;
  customerName: string;
  deliveryPersonId?: number;
  orderDate: Date;
  items: OrderItem[];
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

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}
