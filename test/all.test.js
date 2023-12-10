const request = require("supertest");
const app = require("../server.js");
const { authenticateToken } = require("../middleware/jwt.js");

describe("Register & Login", () => {
  ///////////////////////////////////////////////////////////////////
  //i generated random numbers for different emails
  const randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
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

  let currencyID = null;
  it("POST /v1/currencies should return(200) and creates  new currency useful to candidate insert", async () => {
    const currencyData = {
      code: `U${randomNumber}${randomNumber}`,
    };
    await request(app)
      .post("/v1/currencies")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(currencyData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        currencyID = response.body.id;
      });
  });

  let addressID = null;
  it("POST /v1/addresses should return(200) and creates  new address useful to insert candidate", async () => {
    const adressData = {
      country: "country",
      street_address: "street_address",
      city: "city",
      state: "state",
      postal_code: "postal_code",
    };
    await request(app)
      .post("/v1/addresses")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(adressData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        addressID = response.body.id;
      });
  });

  it("POST /v1/candidates should return(401 , Unauthorized Access) when user accessing api with no  accesstoken", async () => {
    const candidateData = {
      owner_id: owner_id,
      first_name: "first_name",
      last_name: "last_name",
      age: 30,
      department: "department",
      min_salary_expectation: 8,
      max_salary_expectation: 12,
      currency_id: currencyID,
      address_id: addressID,
    };
    await request(app)
      .post("/v1/candidates")
      .send(candidateData)
      .expect(401)
      .then((response) => {
        expect(response.body).toHaveProperty("error", "Unauthorized Access");
      });
  });

  it("POST /v1/candidates should return(403 , Unauthorized Access) when user accessing api with invalid  accesstoken or referesh", async () => {
    const candidateData = {
      owner_id: owner_id,
      first_name: "first_name",
      last_name: "last_name",
      age: 30,
      department: "department",
      min_salary_expectation: 8,
      max_salary_expectation: 12,
      currency_id: currencyID,
      address_id: addressID,
    };
    await request(app)
      .post("/v1/candidates")
      .set("Authorization", `Bearer ${accessToken}${randomNumber}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(candidateData)
      .expect(403)
      .then((response) => {
        expect(response.body).toHaveProperty(
          "error",
          "Unauthorized:Invalid auth token"
        );
      });
  });

  let candidateID = null;
  it("POST /v1/candidates should return(200) and creates  new candidate and stores owner_id.Also return candidate id", async () => {
    const candidateData = {
      owner_id: owner_id,
      first_name: "first_name",
      last_name: "last_name",
      age: 30,
      department: "department",
      min_salary_expectation: 8,
      max_salary_expectation: 12,
      currency_id: currencyID,
      address_id: addressID,
    };
    await request(app)
      .post("/v1/candidates")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(candidateData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        candidateID = response.body.id;
      });
  });

  it("GET /v1/candidates/{id} should return(200) and fetech candidate data using id", async () => {
    await request(app)
      .get(`/v1/candidates/${candidateID}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.first_name);
        expect(response.body.last_name);
        expect(response.body.age);
        expect(response.body.department);
        expect(response.body.min_salary_expectation);
        expect(response.body.max_salary_expectation);
        expect(response.body.currency_code);
      });
  });

  it("POST /v1/candidates/{id} should return(200) and update candidate data using id", async () => {
    const candidateUpdatedData = {
      first_name: "first_name_updated",
      last_name: "last_name_updated",
      age: 30,
      department: "department",
      min_salary_expectation: 8,
      max_salary_expectation: 12,
    };

    await request(app)
      .post(`/v1/candidates/${candidateID}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(candidateUpdatedData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty(
          "message",
          "Candidate updated successfully"
        );
      });
  });

  it("GET /v1/candidates should return(200) and fetch all candidates linked to owner_id with  pagination support.", async () => {
    const pageNo = 1;
    const rowCount = 10;

    await request(app)
      .get(`/v1/candidates/${candidateID}`)
      .query({ pageno: pageNo, rowcount: rowCount })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it("POST /v1/candidate/search should return(200) and return 1 or more rows because one candidate is newly added and api support pagination", async () => {
    const pageNo = 1;
    const rowCount = 10;

    const searchQuery = {
      search: "frist_name",
    };

    await request(app)
      .post(`/v1/candidates/search`)
      .query({ pageno: pageNo, rowcount: rowCount })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .send(searchQuery)
      .expect(200);
  });

  it("DELETE /v1/candidates/{id} should return(200) and delete candidate data using id.it delete newly added test candidate", async () => {
    await request(app)
      .delete(`/v1/candidates/${candidateID}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Refresh", `Bearer ${refreshToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty(
          "message",
          "Candidate deleted successfully"
        );
      });
  });
});
