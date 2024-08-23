import { fetchAllProducts, postProduct, removeProduct } from "../models/products.models.js";
import { Request, Response, NextFunction } from "express";
import checkExists from "../utils/checkExists.js";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await fetchAllProducts();
    res.status(200).send({ products: allProducts.rows });
  } catch (err) {
    next(err);
  }
};

const postNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const addProduct = await postProduct(body);
    res.status(201).send({ product: addProduct.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  const productId: string = req.params.productId
  try {
    await checkExists("products", "product_id", productId)
    removeProduct(productId)
    res.status(204).send();
  } catch (err) {
    next(err)
  }
}

export { getAllProducts, postNewProduct, deleteProduct };
