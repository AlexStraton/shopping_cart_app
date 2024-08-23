import { fetchAllProductsInCart } from "../models/productsInCart.models.js";
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
export { getAllProductsInCart };
