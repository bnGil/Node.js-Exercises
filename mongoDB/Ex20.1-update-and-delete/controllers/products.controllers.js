import { Product } from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const users = await Product.find({});
    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getAllActiveProducts = async (req, res) => {
  try {
    const users = await Product.find({ isActive: true });
    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const getProductsPriceRange = async (req, res) => {
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
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findById(id);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "category", "isActive", "details"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Error. Invalid updates!");
  }
  try {
    const user = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Product.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send(user);
    }
    res.status(204).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(204).send("All products were deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
