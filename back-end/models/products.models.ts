import db from "../db/connection.js";

const fetchAllProducts = async () => {
  return db.query(`SELECT * FROM products;`);
};

const postProduct = async (body: {
  product_name: string;
  price: number;
  description: string;
  product_image_url: string;
}) => {
  const { product_name, price, description, product_image_url } = body;

  let queryString = `INSERT INTO products (product_name, price, description`;

  if (product_image_url) {
    queryString += `, product_image_url`;
  }
  queryString += `) VALUES ($1, $2, $3`;
  if (product_image_url) {
    queryString += `, $4`;
  }
  queryString += `) RETURNING *`;

  const params = [product_name, price, description];
  if (product_image_url) {
    params.push(product_image_url);
  }

  return db.query(queryString, params);
};

export { fetchAllProducts, postProduct };
