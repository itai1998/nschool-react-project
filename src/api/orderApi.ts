import axios from "axios";
import type { OrderItem } from "../model/orderItem";

const API_URL = import.meta.env.VITE_API_URL;

export type CheckoutData = {
  user_id: number;
  shipping_address: string;
  total_amount: number;
  items: OrderItem[];
};

export const createOrder = async (data: CheckoutData) => {
  const response = await axios.post<CheckoutData>(
    `${API_URL}/orders/checkout`,
    data
  );
  return response;
};
