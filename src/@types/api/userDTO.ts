import { Role } from "../models/user";
import { AdressDTO } from "./addressDTO";

export type UserDTO = {
  userId: number;
  username: string;
  cpf: string;
  email: string;
  phone: string;
  expoPushToken?: string;
  role: Role;
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
