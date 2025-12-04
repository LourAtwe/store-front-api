import express from "express";
import supertest from "supertest";
import jwt from "jsonwebtoken"; 
import Order_Product_routes from "../../handlers/Order_ProductRouter";
import Product_routes from "../../handlers/ProductRoute";
import User_routes from "../../handlers/UserRoute";

const app = express();
app.use(express.json());

User_routes(app);
Product_routes(app);
Order_Product_routes(app);

const request = supertest(app);

describe("Orders API Endpoints", () => {
  let token: string;
  let userId: number;
  let product1Id: number;
  let product2Id: number;

  beforeAll(async () => {
    // إنشاء مستخدم
    const userRes = await request.post("/users/create").send({
      firstName: "Test",
      lastName: "User",
      password: "12345",
    });

    token = userRes.body.token;

    if (!token) throw new Error("Token not returned");

    // فك التوكن لجلب userId
    const decoded: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    );

    userId = decoded.user?.id; // ← EXACTLY مطابق للهاندلر تبعك

    if (!userId) throw new Error("User ID not found in token");

    // إنشاء منتجات
    const p1 = await request
      .post("/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Product One", price: 10, category: "Electro" });

    const p2 = await request
      .post("/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Product Two", price: 15, category: "Electro" });

    product1Id = p1.body.product?.id;
    product2Id = p2.body.product?.id;
  });

  it("should create a new order for the logged in user", async () => {
    const res = await request
      .post("/orders/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        products: [
          { product_id: product1Id, quantity: 2 },
          { product_id: product2Id, quantity: 1 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.user_id).toBe(userId);
    expect(res.body.products.length).toBe(2);
  });

  it("should get current active order for the logged in user", async () => {
    const res = await request
      .get("/orders/current")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user_id).toBe(userId);
    expect(res.body.products).toBeDefined();
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request.get("/orders/current");
    expect(res.status).toBe(401);
  });
});
