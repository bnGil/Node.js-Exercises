import { Router } from "express";
import { send } from "process";

import { Product } from "../models/Product.js";

const router = Router();

router.post("/createProduct", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await Product.find({});
    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/all/active", async (req, res) => {
  try {
    const users = await Product.find({ isActive: true });
    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/priceRange", async (req, res) => {
  try {
    const { min, max } = req.body;
    const users = await Product.find({
      $and: [
        { "details.price": { $gte: min } },
        { "details.price": { $lte: max } },
      ],
    });
    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findById(id);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export { router };
