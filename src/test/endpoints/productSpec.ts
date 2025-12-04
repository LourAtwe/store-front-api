
import express from "express";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import Product_routes from "../../handlers/ProductRoute";

const app = express();
app.use(express.json());
Product_routes(app);

const request = supertest(app);

// استخدم نفس الـ secret المستخدم في verifyAuthToken
const TOKEN_SECRET = process.env.TOKEN_SECRET || "test_secret_key";

// إنشاء توكن صالح فعلياً
const validToken = jwt.sign(
  { userId: 1, username: "tester" }, // عدّلها إن كان الميدل وير يحتاج حقول معينة
  TOKEN_SECRET
);

describe("Product Endpoints with verifyAuthToken", () => {
  let createdProductId: number;

  it("should create a new product", async () => {

    const res = await request
      .post("/products/create")
      .set("Authorization", `Bearer ${validToken}`)  // إرسال التوكن
      .send({
        name: "Test Product",
        price: 99,
        category: "Electronics"
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Test Product");

    createdProductId = res.body.id;
  });

  it("should return all products", async () => {
    const res = await request.get("/products/index");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return a product by id", async () => {
    const res = await request.get(`/products/get/${createdProductId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdProductId);
  });
});

