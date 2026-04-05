import axios from "axios";
import type { Product } from "../model/product";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response;
};

export const getProduct = async (id: number) => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response;
};
