export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  user_id: string;
  access: string;
  refresh: string;
  email: string;
  birthDate: string;
  name: string;
}

export interface RegisterParams {
  user: {
    name: string;
    username?: string;
    password: string;
    email: string;
    bith_date?: string;
    user_type: number; //3
    cpf?: string;
  };
  availability: string;
  vehicle: string;
  license_plate: string;
}

export interface googleLoginParams {
  auth_token: string;
  device_type?: string;
}
