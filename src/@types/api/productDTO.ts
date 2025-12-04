export interface ProductDTO {
  id: number;
  company_id: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  category_id: number;
  image: string;
}
