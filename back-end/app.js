import express from "express";
import cors from "cors";
import {
  getAllProducts,
  postNewProduct,
} from "./controller/products.controller.js";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/products", getAllProducts);
app.post("/api/products", postNewProduct);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});
export default app;
