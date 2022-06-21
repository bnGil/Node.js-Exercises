import { Router } from "express";
import { send } from "process";

import { Product } from "../models/Product.js";

const router = Router();

router.post("/createProduct", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .status(201)
    .then(() => {
      res.send(product);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.get("/all", (req, res) => {
  Product.find({})
    .then((users) => {
      res.status(201).send(users);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.get("/all/active", (req, res) => {
  Product.find({ isActive: true })
    .then((users) => {
      res.status(201).send(users);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.get("/priceRange", (req, res) => {
  const { min, max } = req.body;
  Product.find({
    $and: [
      { "details.price": { $gte: min } },
      { "details.price": { $lte: max } },
    ],
  })
    .then((users) => {
      res.status(201).send(users);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

export { router };
