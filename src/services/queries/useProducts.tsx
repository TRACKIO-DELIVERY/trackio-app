import { ProductDTO } from "@/@types/api/productDTO";
import { Product } from "@/@types/models/product";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductDTO[]>("/products/");

  const products: Product[] = data.map((product: ProductDTO) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    categoryId: product.category_id,
    image: product.image,
    companyId: product.company_id,
  }));
  return products;
}
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
