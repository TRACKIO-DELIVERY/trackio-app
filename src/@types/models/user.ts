import { Adress } from "./address";

export type Role = "CUSTOMER" | "DELIVERY";

export type User = {
  userId: number;
  username: string;
  phone: string;
  role: Role;
  cpf: string;
  email: string;
  image_url: string;
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
