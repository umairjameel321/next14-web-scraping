import { create } from "zustand";

const useStore = create((set) => ({
  products: [],
  addProduct: (product: any) =>
    set((state: any) => ({ products: [...state.products, product] })),
}));

export default useStore;
