import request from "supertest";
import { createServer } from "../createServer.js";
import {
  connectDB,
  disconnectDB,
  seedCollection,
  clearCollection,
} from "../config/mongoServer.js";
import products from "../data/products.js";

const app = createServer();

beforeAll(async () => connectDB());
beforeEach(async () => seedCollection("products", products));
afterEach(() => clearCollection("products"));
afterAll(async () => disconnectDB());

describe("getProducts", () => {
  it("returns status code 200 and products", async () => {
    const { statusCode, body } = await request(app).get("/api/products");
    expect(statusCode).toBe(200);
    expect(body.length).toBe(6);
  });
});

describe("getProduct", () => {
  it("returns status code 200 if the product exists", async () => {
    const id = "62dbfa7f31c12b460f19f2b5";
    const { statusCode, body } = await request(app).get(`/api/products/${id}`);
    expect(statusCode).toBe(200);
    expect(body._id.toString()).toBe(id);
  });

  it("returns status code of 404 if the product does not exist", async () => {
    const id = "62dbfa7f31c12b460f19f2b4";
    const { statusCode, body } = await request(app).get(`/api/products/${id}`);
    expect(statusCode).toBe(404);
    expect(body).toEqual({});
  });
});

describe("createProduct", () => {
  it("returns status code 201", async () => {
    const product = {
      name: "Test Product",
      image: "/images/test.jpg",
      description: "Test Product Description",
      brand: "Test Brand",
      category: "Test Category",
      price: 399.99,
      discountPrice: 199.99,
      countInStock: 3,
      rating: 5,
      numReviews: 10,
    };
    const { statusCode } = await request(app)
      .post("/api/products")
      .send(product);
    expect(statusCode).toBe(201);
  });
});

describe("updateProduct", () => {
  const product = {
    name: "Updated Test Product",
    image: "/images/test.jpg",
    description: "Updated Test Product Description",
    brand: "Updated Test Brand",
    category: "Updated Test Category",
    price: 399.99,
    discountPrice: 199.99,
    countInStock: 3,
    rating: 5,
    numReviews: 10,
  };
  it("returns status code 200 if the product to be updated exists", async () => {
    const id = "62dbfa7f31c12b460f19f2b5";
    const { statusCode, body } = await request(app)
      .put(`/api/products/${id}`)
      .send(product);
    expect(statusCode).toBe(200);
    expect(body).toEqual({ ...product, _id: id });
  });

  it("returns status code 404 if the product to be updated does not exist", async () => {
    const id = "62dbfa7f31c12b460f19f2b4";
    const { statusCode, body } = await request(app)
      .put(`/api/products/${id}`)
      .send(product);
    expect(statusCode).toBe(404);
    expect(body).toEqual({});
  });
});

describe("deleteProduct", () => {
  it("returns status code 200 if the product to be deleted exists", async () => {
    const product = {
      _id: "62dbfa7f31c12b460f19f2b5",
      name: "Airpods Wireless Bluetooth Headphones",
      image: "/images/airpods.jpg",
      description:
        "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      brand: "Apple",
      category: "Electronics",
      price: 129.99,
      discountPrice: 89.99,
      countInStock: 3,
      rating: 4.5,
      numReviews: 7,
    };
    const id = "62dbfa7f31c12b460f19f2b5";
    const { statusCode, body } = await request(app).delete(
      `/api/products/${id}`
    );
    expect(statusCode).toBe(200);
    expect(body).toEqual(product);
  });

  it("returns status code 404 if the product to be deleted does not exist", async () => {
    const id = "62dbfa7f31c12b460f19f2b4";
    const { statusCode, body } = await request(app).delete(
      `/api/products/${id}`
    );
    expect(statusCode).toBe(404);
    expect(body).toEqual({});
  });
});
