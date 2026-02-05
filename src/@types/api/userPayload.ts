export interface UserPayload {
  phone: string;
  cpf: string;
  dateOfBirth: string;
  expoPushToken: string;
  role: string;
  address: {
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    number: number;
    zipCode: string;
  };
  vehicleType?: string;
  active?: boolean;
}
