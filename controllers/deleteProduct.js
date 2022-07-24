import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});
