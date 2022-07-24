import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});
