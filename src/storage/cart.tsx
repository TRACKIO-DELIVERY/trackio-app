import { ProductDTO } from "@/dtos/productDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type cartStoreType = {
  products: ProductDTO[];
  addToCart: (newProduct: ProductDTO) => void;
  removeFromCart: (productId: number) => void;
};

export const useCartStore = create<cartStoreType>()(
  persist(
    (set, get) => ({
      products: [] as ProductDTO[],
      addToCart: (newProduct: ProductDTO) =>
        set(() => ({
          products: [...get().products, newProduct],
        })),
      removeFromCart: (productId: number) =>
        set(() => ({
          products: get().products.filter(
            (product) => product.id !== productId
          ),
        })),
    }),
    {
      name: "@trackio::cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
