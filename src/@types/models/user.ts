import { Adress } from "./address";

export type User = {
  userId: number;
  username: string;
  phone: string;
  role: string;
  cpf: string;
  email: string;
  imageUrl: string;
  dateOfBirth: string;
  expoPushToken?: string;
};

export type Customer = User & {
  address?: Adress;
};

export type DeliveryPerson = User & {
  address?: Adress;
  vehicleType?: string;
};
