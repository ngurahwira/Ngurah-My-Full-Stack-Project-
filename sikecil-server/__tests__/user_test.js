const request = require("supertest");
const { sequelize } = require("../models");

const app = require("../app");
const { createToken, hashing } = require("../helpers");
const { queryInterface } = sequelize;
let access_token;

beforeAll(async () => {
  const data = require("../data/user.json");
  data.forEach((user) => {
    delete user.id;
    user.password = hashing(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  await queryInterface.bulkInsert("Profiles", data, {});

  const payload = {
    id: 1,
    email: "johndoe@example.com",
    role: "user",
  };
  access_token = createToken(payload);
});
afterAll(async () => {
  await queryInterface.bulkDelete("Profiles", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

//! Login ----------
describe("POST /login - succeed", () => {
  it("access token", async () => {
    const body = {
      email: "johndoe@example.com",
      password: "password123",
    };
    const response = await request(app).post("/login").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("POST /login - error", () => {
  it("email null ", async () => {
    const body = {
      email: null,
      password: "SecretPass123",
    };
    const response = await request(app).post("/login").send(body);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(expect.any(Object));
  });
});

// describe("POST /login - error", () => {
//   it("password null ", async () => {
//     const body = {
//       email: "alice@example.com",
//       password: null,
//     };
//     const response = await request(app).post("/login").send(body);

//     expect(response.status).toBe(401);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /login - error", () => {
//   it("wrong email", async () => {
//     const body = {
//       email: "ce@example.com",
//       password: "SecretPass123",
//     };
//     const response = await request(app).post("/login").send(body);

//     expect(response.status).toBe(401);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /login - error", () => {
//   it("password not match", async () => {
//     const body = {
//       email: "alice@example.com",
//       password: "Pass123",
//     };
//     const response = await request(app).post("/login").send(body);

//     expect(response.status).toBe(401);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// //! Register -----------
// describe("POST /Add user - success", () => {
//   it("add user ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "asd@getMaxListeners.com",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(201);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("password null ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "asd@getMaxListeners.com",
//       password: null,
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("password null ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: null,
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("email empty ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("password empty ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "asd@getMaxListeners.com",
//       password: "",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("email doublt ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "bob@example.com",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("wrong format email ", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "example.com",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}`);

//     expect(response.status).toBe(400);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("does not contain tokens", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "asd@getMaxListeners.com",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app).post("/register").send(body);

//     expect(response.status).toBe(401);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });

// describe("POST /Add user - fail", () => {
//   it("wrong token", async () => {
//     const body = {
//       username: "ngurah123",
//       email: "asd@getMaxListeners.com",
//       password: "123asd",
//       role: "Staff",
//       phoneNumber: 10212,
//       address: "bali",
//     };
//     const response = await request(app)
//       .post("/register")
//       .send(body)
//       .set("authorization", `Bearer ${access_token}jhg`);

//     expect(response.status).toBe(401);
//     expect(response.body).toMatchObject(expect.any(Object));
//   });
// });
