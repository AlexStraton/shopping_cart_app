import axios from "axios";

const api = axios.create({ baseURL: "/api/" });

export async function getAllProducts() {
  try {
    const products = await api.get("products");
    return products;
  } catch (error) {
    console.log(error);
  }
}
