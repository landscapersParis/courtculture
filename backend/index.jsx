import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import fetch from "node-fetch";
import { Product } from "./models/Product.js";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Seed data
Product.countDocuments({}, async (err, count) => {
  if (count === 0) {
    await Product.insertMany([
      { title: "Poster Jordan Dunk", description: "Poster exclusif inspiré de Jordan.", price: 25, image: "/images/poster-jordan.jpg", isPOD: true },
      { title: "Ballon Basket Pro", description: "Ballon haute qualité grip pro.", price: 45, image: "/images/ballon-pro.jpg", isPOD: false }
    ]);
  }
});

app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.get("/products/:id", async (req, res) => {
  res.json(await Product.findById(req.params.id));
});

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map(item => ({
      price_data: { currency: "eur", product_data: { name: item.title }, unit_amount: item.price * 100 },
      quantity: item.quantity
    })),
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });
  res.json({ id: session.id });
});

app.post("/printful/order", async (req, res) => {
  const response = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.PRINTFUL_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});

app.listen(4000, () => console.log("Backend running on port 4000"));
