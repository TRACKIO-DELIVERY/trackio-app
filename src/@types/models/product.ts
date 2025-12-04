export interface Product {
  id: number;
  companyId: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  categoryId: number;
  image: string;
}
