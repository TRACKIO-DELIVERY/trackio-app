import { ProductDTO } from "@/dtos/productDTO";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProducts(orderId: string): Promise<ProductDTO> {
  const { data } = await api.get(`/products/${orderId}`);

  const product: ProductDTO = {
    id: data.id,
    category: data.category,
    price: data.price,
    description: data.description,
    image: data.image,
    name: data.name,
  };
  return product;
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: [`products-${productId}`],
    queryFn: () => getProducts(productId),
  });
}
