import { fetchAllProductsInCart, addProductToCart, removeProductFromCart, updateProductInCart } from "../models/productsInCart.models.js";
import checkExists from "../utils/checkExists.js";
const getAllProductsInCart = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await checkExists("users", "user_id", userId);
        const allProductsInCart = await fetchAllProductsInCart(userId);
        res.status(200).send({ productsInCart: allProductsInCart.rows });
    }
    catch (err) {
        next(err);
    }
};
const postProductToCart = async (req, res, next) => {
    const body = req.body;
    if (!body) {
        throw { status: 400, msg: "Bad Request" };
    }
    await checkExists("users", "user_id", body.user_id);
    await checkExists("products", "product_id", body.product_id);
    try {
        const productToPost = await addProductToCart(body);
        res.status(201).send({ product: productToPost.rows });
    }
    catch (err) {
        next(err);
    }
};
const deleteProductInCart = async (req, res, next) => {
    const body = req.body;
    if (!body) {
        throw { status: 400, msg: "Bad Request" };
    }
    await checkExists("productsincart", "cart_line_id", body.cart_line_id);
    try {
        await removeProductFromCart(body.cart_line_id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
const patchProductInCart = async (req, res, next) => {
    const cart_line_id = req.params.cartId;
    const quantity = req.body.quantity;
    await checkExists("productsincart", "cart_line_id", cart_line_id);
    try {
        const updatedProduct = await updateProductInCart(cart_line_id, quantity);
        res.status(200).send({ updatedProduct: updatedProduct.rows[0] });
    }
    catch (err) {
        next(err);
    }
};
export { getAllProductsInCart, postProductToCart, deleteProductInCart, patchProductInCart, };
