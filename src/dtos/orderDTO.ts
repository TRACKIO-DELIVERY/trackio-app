import { DeliveryPersonDTO } from "./deliveryPersonDTO";

export interface OrderDTO {
  id: number;
  establishment: string;
  email: string;
  deliveryPerson?: DeliveryPersonDTO | null;
  deliveryFee: string;
  orderValue?: string;
  orderStatus: number;
  fullDeliveryAddress: string;
  fullPickUpAdrress: string;
  date?: string;
  total?: number;
  status?: "preparing" | "on_the_way" | "delivered";
}

export interface ComplementaryDTO {
  deliveryStreet: string;
  deliveryNeighborhood?: string;
  deliveryNumber: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryCountry: string;
}

export interface TrackingDTO {
  startLatitude: string;
  startLongitude: string;
  endLatitude: string;
  endLongitude: string;
}
