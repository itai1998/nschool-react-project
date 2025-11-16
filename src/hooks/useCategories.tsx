import { useEffect, useState } from "react";
import type { Category } from "../api/constants/category";
import { getCategories } from "../api";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data);
    };
    fetchCategories();
  }, []);
  return { categories };
};
