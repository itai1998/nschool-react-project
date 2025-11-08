import axios from "axios";
//import mockData from "../data/macbookMock.json";

// const api: AxiosInstance = axios.create({})

export const getProducts = () => {
  return axios.get("/src/data/macbookMock.json");
};

export const getCategories = () => {
  return axios.get("/src/data/category.json");
};

// use promise
// export const getProducts = () => {
//     return Promise.resolve({
//       data: mockData,
//       status: 200,
//       statusText: "OK",
//     });
//   };
