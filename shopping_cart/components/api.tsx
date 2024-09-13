import axios from "axios";

const api = axios.create({
  baseURL: "https://shopping-cart-app-mzi2.onrender.com/api",
});

export async function getAllProducts() {
  try {
    const products = await api.get("/products");
    return products.data.products;
  } catch (error) {
    console.log(error);
  }
}

export async function postProductToCart(
  user_id: number,
  product_id: number,
  quantity: number
) {
  try {
    const body = {
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
    };
    const product = await api.post("/productsInCart", body);
    return product.data.product;
  } catch (error) {
    console.log(error);
  }
}

export async function postProduct(body) {
  try {
    const response = await api.post("/products", body);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProductsInCart(userId) {
  try {
    const productsInCart = await api.get("/productsInCart/${userId}");
    console.log(productsInCart.data);
    return productsInCart.data.products;
  } catch (error) {
    console.log(error);
  }
}
