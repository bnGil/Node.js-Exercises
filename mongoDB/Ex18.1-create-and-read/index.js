import express from "express";
import cors from "cors";

import { router as productsRouter } from "./routes/products.routes.js";
import "./db/mongoose.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
