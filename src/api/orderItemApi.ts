import axios from "axios";
import type { OrderItem } from "../model/orderItem";

const API_URL = import.meta.env.VITE_API_URL;

export const addOrderItem = async (orderItems: OrderItem) => {
  const response = await axios.post<OrderItem>(
    `${API_URL}/orderItems`,
    orderItems
  );
  return response;
};
