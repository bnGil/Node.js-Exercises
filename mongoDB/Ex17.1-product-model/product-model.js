import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce-api", {
  useNewUrlParser: true,
});

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

const Product = mongoose.model("Product", productSchema);

const shampo = new Product({
  name: "head and shoulders",
  category: "hygiene",
  isActive: true,
  details: {
    description: "very good for dandruff",
    price: 24,
    images: [
      "https://d2wwnnx8tks4e8.cloudfront.net/images/app/large/5410076230068_3.JPG",
      "https://d2wwnnx8tks4e8.cloudfront.net/images/app/large/5410076230068_3.JPG",
    ],
    phone: "009720583331332",
  },
});

shampo
  .save()
  .then(() => {
    console.log(shampo);
    return;
  })
  .catch((err) => {
    console.log(err);
  });

const iphone = new Product({
  name: "iphone 13 pro",
  category: "electronics",
  isActive: false,
  details: {
    description: "apples's best",
    price: 7144,
    images: [
      "https://d3m9l0v76dty0.cloudfront.net/system/photos/8455502/original/c069253eb252934d28c767fe3a797fd9.jpg",
      "https://d3m9l0v76dty0.cloudfront.net/system/photos/8455502/original/c069253eb252934d28c767fe3a797fd9.jpg",
    ],
    phone: "009726599573789",
  },
});

iphone
  .save()
  .then(() => {
    console.log(iphone);
    return;
  })
  .catch((err) => {
    console.log(err);
  });

const monopoly = new Product({
  name: "monopoly",
  category: "board games",
  details: {
    description: "best times",
    price: 90,
    images: [
      "https://nationaltoday.com/wp-content/uploads/2021/10/national-monopoly-day.jpg",
      "https://nationaltoday.com/wp-content/uploads/2021/10/national-monopoly-day.jpg",
    ],
    phone: "009726599794799",
  },
});

monopoly
  .save()
  .then(() => {
    console.log(monopoly);
    return;
  })
  .catch((err) => {
    console.log(err);
  });
