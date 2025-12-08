import { Product } from "@/@types/models/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type cartProductType = Product & {
  quantity: number;
};
type cartStoreType = {
  products: cartProductType[];
  addToCart: (newProduct: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

export const useCartStore = create<cartStoreType>()(
  persist(
    (set, get) => ({
      products: [] as cartProductType[],
      addToCart: (newProduct: Product, quantity: number) =>
        set(() => {
          const productExists = get().products.find(
            (item) => item.id === newProduct.id
          );

          if (productExists) {
            return {
              products: get().products.map((item) =>
                item.id === newProduct.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            products: [
              ...get().products,
              { ...newProduct, quantity: quantity },
            ],
          };
        }),
      removeFromCart: (productId: number) =>
        set(() => {
          const productExists = get().products.find(
            (item) => item.id === productId
          );
          if (!productExists) return { products: get().products };

          if (productExists.quantity > 1) {
            return {
              products: get().products.map((item) =>
                item.id === productExists.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
          // quantity === 1
          return {
            products: get().products.filter((item) => item.id != productId),
          };
        }),
    }),
    {
      name: "@trackio::cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
