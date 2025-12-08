import { Adress } from "./address";

export type User = {
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: string;
};

export type Customer = User & {
  birthDate: string;
  cpf: string;
  address?: Adress;
  imageUrl: string;
};

export type DeliveryPerson = User & {
  birthDate: string;
  cpf: string;
  address?: Adress;
  imageUrl: string;
  vehicleType?: string;
};
