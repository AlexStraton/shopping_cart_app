import { fetchAllProducts, postProduct } from "../models/products.models.js";
const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await fetchAllProducts();
        res.status(200).send({ products: allProducts.rows });
    }
    catch (err) {
        next(err);
    }
};
const postNewProduct = async (req, res, next) => {
    const body = req.body;
    try {
        const addProduct = await postProduct(body);
        // if (addProduct.rows[0].product_image_url === null) {
        //   addProduct.rows[0].product_image_url =
        //     "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
        //     console.log("Reaching inside If block")
        // }
        res.status(201).send({ product: addProduct.rows[0] });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
export { getAllProducts, postNewProduct };
