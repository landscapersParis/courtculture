import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  isPOD: Boolean
});
export const Product = mongoose.model("Product", productSchema);
