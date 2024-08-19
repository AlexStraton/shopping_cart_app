import { fetchAllProducts, postProduct } from "../models/products.models.js";

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await fetchAllProducts();
    res.status(200).send({ products: allProducts.rows });
  } catch(err) {
    next(err);
  }
};

const postNewProduct = async (req, res, next) => {
  const body = req.body;
  try {
    const addProduct = await postProduct(body);
    res.status(201).send({ product: addProduct.rows[0] });
  } catch(err) {
    console.log(err)
    next(err);
  }
};

export { getAllProducts, postNewProduct };
