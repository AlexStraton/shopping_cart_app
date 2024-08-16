import fetchAllProducts from "../models/products.models.js";

const getAllProducts = async (err) => {
  try {
    const allProducts = await fetchAllProducts();
    console.log(allProducts);
  } catch {
    return err;
  }
};

export default getAllProducts;
