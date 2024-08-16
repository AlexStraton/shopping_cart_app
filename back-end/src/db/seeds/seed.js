import format from "pg-format";
import db from "../connection.js";
const seed = async ({ products, productsInCart, users }) => {
    await db.query("DROP TABLE IF EXISTS productsInCart;");
    await db.query("DROP TABLE IF EXISTS products;");
    await db.query("DROP TABLE IF EXISTS users;");
    await db.query("CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL, avatar VARCHAR(100) DEFAULT 'https://www.rcemlearning.org/wp-content/uploads/blank-user-icon-image.jpg');");
    await db.query("CREATE TABLE products(product_id SERIAL PRIMARY KEY, product_name VARCHAR(100) NOT NULL, price INT NOT NULL, description VARCHAR(200), product_image_url VARCHAR(200) DEFAULT 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png');");
    await db.query("CREATE TABLE productsInCart(cart_line_id SERIAL PRIMARY KEY, user_id INT REFERENCES users(user_id), product_id INT REFERENCES products(product_id), quantity INT);");
    const insertUsersString = format("INSERT INTO users (username) VALUES %L;", users.map(({ username }) => [username]));
    await db.query(insertUsersString);
    const insertProductsString = format("INSERT INTO products (product_name, price, description, product_image_url) VALUES %L;", products.map(({ product_name, price, description, product_image_url }) => [
        product_name,
        price,
        description,
        product_image_url,
    ]));
    await db.query(insertProductsString);
    const insertProductsInCartString = format("INSERT INTO productsInCart (user_id, product_id, quantity) VALUES %L", productsInCart.map(({ user_id, product_id, quantity }) => [
        user_id,
        product_id,
        quantity,
    ]));
    await db.query(insertProductsInCartString);
};
export default seed;
