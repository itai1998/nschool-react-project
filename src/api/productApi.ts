import axios from "axios";
import type { Product } from "../model/product";

export const getProducts = async () => {
  const response = await axios.get<Product[]>("http://localhost:3000/products");
  return response;
};
