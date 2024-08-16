import fetchAllProducts from "../models/products.models.js";
const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await fetchAllProducts();
        res.status(200).send({ products: allProducts.rows });
    }
    catch {
        return err;
    }
};
export default getAllProducts;
