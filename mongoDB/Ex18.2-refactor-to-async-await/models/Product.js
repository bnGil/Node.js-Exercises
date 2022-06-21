import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: {
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Price must be a positive number!");
        }
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: undefined,
      required: true,
      validate(val) {
        if (val.length < 2) {
          throw new Error("array must at least 2 images URLs");
        }
        val.forEach((el) => {
          if (!validator.isURL(el)) {
            throw new Error("all array items must be image URLs");
          }
        });
      },
    },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (
          !validator.isMobilePhone(value) ||
          !value.startsWith("00972") ||
          value.length !== 15
        ) {
          throw new Error("Phone number is invalid");
        }
      },
    },
    dateAdded: {
      type: String,
      default: Date(),
    },
  },
});

export const Product = mongoose.model("Product", productSchema);
