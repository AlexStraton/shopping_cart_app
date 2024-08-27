import db from "../db/connection.js";

interface productBody {
  user_id: string;
  product_id: string;
  quantity: number;
}

const fetchAllProductsInCart = (userId: string) => {
  return db.query(
    "SELECT * FROM productsInCart LEFT JOIN products ON productsInCart.product_id = products.product_id WHERE user_id = $1",
    [userId]
  );
};

const addProductToCart = (productBody: productBody) => {
  const { user_id, product_id, quantity } = productBody;
  return db.query(
    "INSERT INTO productsInCart (product_id, user_id, quantity) VALUES ($1, $2, $3) RETURNING *;",
    [product_id, user_id, quantity]
  );
};

const removeProductFromCart = (cart_line_id: string) => {
  return db.query("DELETE FROM productsInCart WHERE cart_line_id = $1", [
    cart_line_id,
  ]);
};

const updateProductInCart = (cart_line_id: string, quantity: string) => {
  return db.query(
    "UPDATE productsincart SET quantity = $1 WHERE cart_line_id = $2 RETURNING *",
    [quantity, cart_line_id]
  );
};

const removeAllProductsInCart = (userId: string) => {
  return db.query("DELETE FROM productsInCart WHERE user_id = $1", [userId]);
};
export {
  fetchAllProductsInCart,
  addProductToCart,
  removeProductFromCart,
  updateProductInCart,
  removeAllProductsInCart,
};
