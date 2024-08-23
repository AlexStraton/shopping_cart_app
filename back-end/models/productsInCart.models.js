import db from "../db/connection.js";
const fetchAllProductsInCart = (userId) => {
    return db.query("SELECT * FROM productsInCart LEFT JOIN products ON productsInCart.product_id = products.product_id WHERE user_id = $1", [userId]);
};
export { fetchAllProductsInCart };
