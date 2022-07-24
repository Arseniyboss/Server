import express from "express";
import productRoutes from "./routes/productRoutes.js";

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(express.static("./public"));

  app.get("/", (req, res) => {
    res.send("Api is running...");
  });

  app.use("/api/products", productRoutes);

  return app;
};
