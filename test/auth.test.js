const request = require("supertest");
const app = require("../server.js");

describe("Register & Login", () => {
  ///////////////////////////////////////////////////////////////////
  //i generated random numbers for different emails
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  //save id when user register
  let owner_id = null;

  it("POST /v1/register should return(200) and create a new user when valid data is provided", async () => {
    const userData = {
      email: `testemail${randomNumber}@example.com`,
      password: "password123",
      first_name: "test name",
      last_name: "test name",
    };
    await request(app)
      .post("/v1/register")
      .send(userData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body.email).toBe(userData.email);
        expect(response.body.first_name).toBe(userData.first_name);
        expect(response.body.last_name).toBe(userData.last_name);
        owner_id = response.body.id;
      });
  });

  it("POST /v1/register should return(409 email already exists)if any user register with the existing email", async () => {
    const existingUser = {
      email: `testemail${randomNumber}@example.com`,
      password: "password123",
      first_name: "test name",
      last_name: "test name",
    };
    await request(app)
      .post("/v1/register")
      .send(existingUser)
      .expect(409)
      .then((response) => {
        expect(response.body).toHaveProperty(
          "error",
          "User already exists with this email"
        );
      });
  });

  it("POST /v1/login should return(404 User not found) when user login with invalid credentials", async () => {
    const existingUser = {
      email: `nonexistemail@example.com`,
      password: "password123",
    };
    await request(app)
      .post("/v1/login")
      .send(existingUser)
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty("error", "User not found");
      });
  });

  it("POST /v1/referesh should return(200) when user request  new tokens using  id", async () => {
    const existingUser = {
      id: `1234-1234-4321-4321`,
    };
    await request(app)
      .post("/v1/referesh")
      .send(existingUser)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
      });
  });
  //////////////////////////////////////////////////////////////////////////////////////

  let accessToken = null;
  let refreshToken = null;
  it("POST /v1/login should return(200,accesstoken & referesh tokens) when registered user login with valid credentials", async () => {
    const loginData = {
      email: `testemail${randomNumber}@example.com`,
      password: "password123",
    };
    await request(app)
      .post("/v1/login")
      .send(loginData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
      });
  });

  it("POST /v1/candidates should return(200) and creates  new candidate and stores owner_id", async () => {
    const candidateData = {
      email: `testemail${randomNumber}@example.com`,
      password: "password123",
    };
    await request(app)
      .post("/v1/login")
      .send(loginData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
      });
  });

  //.set('Authorization', `Bearer ${token}`)
});
