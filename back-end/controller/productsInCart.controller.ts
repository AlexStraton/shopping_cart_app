import { Request, Response, NextFunction } from "express";
import {
  fetchAllProductsInCart,
  addProductToCart,
  removeProductFromCart,
  updateProductInCart,
  removeAllProductsInCart,
} from "../models/productsInCart.models.js";
import checkExists from "../utils/checkExists.js";

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const getAllProductsInCart: ControllerFunction = async (req, res, next) => {
  try {
    const userId: string = req.params.userId;
    await checkExists("users", "user_id", userId);
    const allProductsInCart = await fetchAllProductsInCart(userId);
    res.status(200).send({ productsInCart: allProductsInCart.rows });
  } catch (err) {
    next(err);
  }
};

const postProductToCart: ControllerFunction = async (req, res, next) => {
  interface body {
    user_id: string;
    product_id: string;
    quantity: number;
  }
  const body: body = req.body;
  if (!body) {
    throw { status: 400, msg: "Bad Request" };
  }
  await checkExists("users", "user_id", body.user_id);
  await checkExists("products", "product_id", body.product_id);
  try {
    const productToPost = await addProductToCart(body);
    res.status(201).send({ product: productToPost.rows });
  } catch (err) {
    next(err);
  }
};

const deleteProductInCart: ControllerFunction = async (req, res, next) => {
  const cart_line_id: string = req.params.cartId;
  if (!cart_line_id) {
    throw { status: 400, msg: "Bad Request" };
  }

  await checkExists("productsincart", "cart_line_id", cart_line_id);
  try {
    await removeProductFromCart(cart_line_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const patchProductInCart: ControllerFunction = async (req, res, next) => {
  const cart_line_id = req.params.cartId;
  const quantity: string = req.body.quantity;
  await checkExists("productsincart", "cart_line_id", cart_line_id);
  try {
    const updatedProduct = await updateProductInCart(cart_line_id, quantity);
    res.status(200).send({ updatedProduct: updatedProduct.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteAllProductsInCart: ControllerFunction = async (req, res, next) => {
  const userId: string = req.params.userId;

  await checkExists("users", "user_id", userId);

  try {
    await removeAllProductsInCart(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getAllProductsInCart,
  postProductToCart,
  deleteProductInCart,
  patchProductInCart,
  deleteAllProductsInCart,
};
