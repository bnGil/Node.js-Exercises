import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getAllActiveProducts,
  getProductsPriceRange,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.controllers.js";

const router = Router();

router.post("/createProduct", createProduct);
router.get("/all", getAllProducts);
router.get("/all/active", getAllActiveProducts);
router.get("/priceRange", getProductsPriceRange);
router.get("/:id", getProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.delete("/delete/all", deleteAllProducts);

export { router };
