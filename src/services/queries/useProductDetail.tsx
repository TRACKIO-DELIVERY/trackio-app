import { ProductDTO } from "@/@types/api/productDTO";
import { Product } from "@/@types/models/product";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

async function getProduct(orderId: string): Promise<Product> {
  const { data } = await api.get<ProductDTO>(`/products/${orderId}`);

  const product: Product = {
    id: data.id,
    categoryId: data.category_id,
    price: data.price,
    description: data.description,
    image: data.image,
    name: data.name,
    companyId: data.company_id,
  };
  return product;
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: [`products-${productId}`],
    queryFn: () => getProduct(productId),
  });
}
