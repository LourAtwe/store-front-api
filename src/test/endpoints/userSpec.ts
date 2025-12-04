import express from "express";
import supertest from "supertest";
import User_routes from "../../handlers/UserRoute"; // عدّل حسب مسارك

const app = express();
app.use(express.json());
User_routes(app);
const request = supertest(app);

describe("Users Endpoints", () => {

  let token: string;
  let createdUserId: number;

  // ----- Create User -----
  it("should create a new user and return a token", async () => {
    const res = await request
      .post("/users/create")
      .send({
        firstName: "John",
        lastName: "Doe",
        password: "12345"
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();   // ensure token returned

    token = res.body.token;

    // Decode user id from token (اختياري)
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    createdUserId = payload.user.id;
  });

  // ----- Index Users -----
  it("should return list of users", async () => {
    const res = await request
      .get("/users/index")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });

  // ----- Show Single User -----
  it("should return user by id", async () => {
    const res = await request
      .get(`/users/get/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdUserId);
  });
});
