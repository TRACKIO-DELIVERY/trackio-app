import { Establishment } from "@/@types/establishment";
import { DeliveryPersonDTO } from "./deliveryPersonDTO";

export interface OrderDTO {
  id: number;
  establishment: Establishment;
  email: string;
  deliveryPerson: DeliveryPersonDTO | null;
  deliveryFee: string;
  orderValue: string;
  closingDate?: string | null;
  orderStatus: number;
}

