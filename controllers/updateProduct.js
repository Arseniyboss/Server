import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});
