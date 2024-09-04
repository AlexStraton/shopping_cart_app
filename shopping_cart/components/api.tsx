import axios from "axios";

const api = axios.create({
  baseURL: "https://shopping-cart-app-mzi2.onrender.com/api",
});

export async function getAllProducts() {
  try {
    const products = await api.get("/products");

    console.log(products, "api call");
    return products.data.products;
  } catch (error) {
    console.log(error);
  }
}
