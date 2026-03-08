import { useEffect, useState } from "react";
import type { Macbook } from "../model/macbook";
import { getProducts } from "../api";

export const useProducts = () => {
  const [products, setProducts] = useState<Macbook[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);
  return { products };
};
