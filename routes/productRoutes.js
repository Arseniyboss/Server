import express from "express";
import { getProducts } from "../controllers/getProducts.js";
import { getProduct } from "../controllers/getProduct.js";
import { createProduct } from "../controllers/createProduct.js";
import { deleteProduct } from "../controllers/deleteProduct.js";
import { updateProduct } from "../controllers/updateProduct.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

export default router;
