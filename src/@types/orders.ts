import { DeliveryPerson } from "./deliveryPerson";
import { Establishment } from "./establishment";

export enum OrderStatus {
  PENDING = 0,
  PROCESSING = 1,
  COMPLETED = 2,
  CANCELED = 3,
}

export type Order = {
  id: number;
  establishment: Establishment;
  email: string;
  delivery_person: DeliveryPerson | null;
  delivery_fee: string;
  order_value: string;
  order_status: OrderStatus;
  complementary_order: ComplementaryOrder
}

export interface ComplementaryOrder {
  delivery_street: string;
  delivery_neighborhood?: string;
  delivery_number: string;
  delivery_city: string;
  delivery_state: string;
  delivery_country: string;
}

export interface OrderTracking {
  id: number;
  order: Order;
  start_latitude: string;
  start_longitude: string;
  end_latitude: string;
  end_longitude: string;
}
