import { Address } from "./address";


export interface Establishment {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  active: boolean;
  address: Address; 
  created: string; 
  modified: string;
}