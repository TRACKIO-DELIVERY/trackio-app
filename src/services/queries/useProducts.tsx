import { ProductDTO } from "@/dtos/productDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<ProductDTO[]> {
  const { data } = await api.get("/products/");

  const products: ProductDTO[] = data.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  }));
  return products;
}
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
