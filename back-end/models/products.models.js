import db from "../db/connection.js";
const fetchAllProducts = async () => {
    return db.query(`SELECT * FROM products;`);
};
export default fetchAllProducts;
