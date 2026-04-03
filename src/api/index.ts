import axios from "axios";

export const getProducts = () => {
  return axios.get("/src/data/macbookMock.json");
};

export const getCategories = () => {
  return axios.get("/src/data/category.json");
};
