import { ProductDTO } from "@/@types/api/productDTO";
import { Product } from "@/@types/models/product";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProduct(orderId: string): Promise<Product> {
  const { data } = await api.get<ProductDTO>(`/products/${orderId}`);

  const product: Product = {
    id: data.id,
    categoryId: data.categoryId,
    categoryName: data.categoryName,
    price: data.price,
    description: data.description,
    imageUrl: data.imageUrl,
    name: data.name,
    companyId: data.companyId,
    companyName: data.companyName,
    stock: data.stock,
  };
  return product;
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: [`products-${productId}`],
    queryFn: () => getProduct(productId),
  });
}
