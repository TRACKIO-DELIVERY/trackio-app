import { Establishment } from "@/@types/establishment";
import { Order } from "@/@types/orders";
import { DeliveryPerson } from "@/@types/deliveryPerson";

export interface OrderDTO {
  id: number;
  establishment: Establishment;
  email: string;
  deliveryPerson: DeliveryPerson
  deliveryFee: string;
  orderValue: string;
  closingDate?: string | null;
  orderStatus: number;
}

export function toOrderDTO (order: Order): OrderDTO {
  return {  
      id: order.id,
      establishment: order.establishment,
      email: order.email,
      deliveryPerson: order.delivery_person,
      deliveryFee: order.delivery_fee,
      orderValue: order.order_value,
      closingDate: order.closing_date,
      orderStatus: order.order_status,

    }
};
