import { AdressDTO } from "./addressDTO";

export type UserDTO = {
  user_id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: string;
};

export type CustumerDTO = UserDTO & {
  birth_date: string;
  cpf: string;
  address: AdressDTO;
  image_url: string;
};

export type DeliveryPersonDTO = UserDTO & {
  birth_date: string;
  cpf: string;
  address: AdressDTO;
  image_url: string;
  vehicle_type: string;
};
