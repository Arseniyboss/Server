import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import { createServer } from "./createServer.js";

dotenv.config();

const app = createServer();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
