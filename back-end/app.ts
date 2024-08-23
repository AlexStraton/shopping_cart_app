import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getAllProducts, postNewProduct, deleteProduct } from "./controller/products.controller.js";

interface CustomError {
  status?: number;
  msg?: string;
  code?: string;
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", getAllProducts);

app.post("/api/products", postNewProduct);

app.delete("/api/products/:productId", deleteProduct)

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({ msg: "Not Found" });
});


app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

export default app;

