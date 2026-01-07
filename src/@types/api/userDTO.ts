import { AdressDTO } from "./addressDTO";

export type UserDTO = {
  userId: number;
  username: string;
  cpf: string;
  email: string;
  phone: string;
  expoPushToken?: string;
  role: string;
  image_url: string;
  dateOfBirth: string;
};

export type CustumerDTO = UserDTO & {
  address: AdressDTO;
};

export type DeliveryPersonDTO = UserDTO & {
  address: AdressDTO;
  vehicle_type: string;
};
