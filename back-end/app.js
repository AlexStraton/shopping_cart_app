import express from "express";
import cors from "cors";
import { getAllProducts, postNewProduct, deleteProduct, } from "./controller/products.controller.js";
import { getAllUsers } from "./controller/users.controller.js";
import { getAllProductsInCart, postProductToCart, deleteProductInCart, patchProductInCart } from "./controller/productsInCart.controller.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/products", getAllProducts);
app.get("/api/users", getAllUsers);
app.get("/api/productsInCart/:userId", getAllProductsInCart);
app.post("/api/products", postNewProduct);
app.post("/api/productsInCart", postProductToCart);
app.delete("/api/products/:productId", deleteProduct);
app.delete("/api/productsInCart", deleteProductInCart);
app.patch("/api/productsInCart/:cartId", patchProductInCart);
//OPTIONAL: PATCH product
app.all("*", (req, res) => {
    console.log("404 error");
    res.status(404).send({ msg: "Not Found" });
});
app.use((err, req, res, next) => {
    console.log(err);
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else if (err.code) {
        res.status(400).send({ msg: "Bad Request" });
    }
    else {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});
export default app;
