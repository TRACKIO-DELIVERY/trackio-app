export enum Category {
  Lanche = "Lanche",
  Bebida = "Bebida",
  Sobremesa = "Sobremesa",
  Pizza = "Pizza",
  Japonesa = "Japonesa",
  Saudavel = "Saudável",
}
export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category | string;
  image: string;
  quantity?: number;
}
