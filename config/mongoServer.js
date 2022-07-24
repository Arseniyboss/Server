import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const collections = mongoose.connection.collections;

let mongoServer;

export const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export const disconnectDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const seedCollection = async (name, data) => {
  const collection = collections[name];
  await collection.insertMany(data);
};

export const clearCollection = (name) => {
  const collection = collections[name];
  collection.deleteMany();
};
