import { ProductDTO } from "@/@types/api/productDTO";
import { Product } from "@/@types/models/product";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductDTO[]>("/product");

  const products: Product[] = data.map((product: ProductDTO) => ({
    id: product.id,
    categoryId: product.categoryId,
    categoryName: product.categoryName,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    name: product.name,
    companyId: product.companyId,
    companyName: product.companyName,
    stock: product.stock,
  }));
  return products;
}
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
