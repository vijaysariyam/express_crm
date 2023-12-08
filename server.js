/*
{
  "id": "0132843c-eac9-4925-9006-5146a8907425",
  "email": "vijay.sariyam@gmail.com",
  "password": "123@Apple",
  "first_name": "vijay",
  "last_name": " sariyam"
}
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMzI4NDNjLWVhYzktNDkyNS05MDA2LTUxNDZhODkwNzQyNSIsImVtYWlsIjoidmlqYXkuc2FyaXlhbUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoidmlqYXkiLCJsYXN0X25hbWUiOiIgc2FyaXlhbSIsImlhdCI6MTcwMTkyODgxN30.2Nr6s951lJiiPEa6m4As04D44VL69WeN39F7X5Bpljg",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMzI4NDNjLWVhYzktNDkyNS05MDA2LTUxNDZhODkwNzQyNSIsImVtYWlsIjoidmlqYXkuc2FyaXlhbUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoidmlqYXkiLCJsYXN0X25hbWUiOiIgc2FyaXlhbSIsImlhdCI6MTcwMTkyODgxN30.c-n3WAhl8b_ZaC0Jf-_z9d12abt02ciQzzeEHBUVYLM"
}

[
  {
    "id": "21612ea9-8d23-451f-92f9-0ddcf5083b79",
    "country": "country 2",
    "street_address": "street_address 2",
    "city": "city 2",
    "state": "state 2",
    "postal_code": "postal_code 2"
  },
  {
    "id": "2a2e7d26-7dc2-4bd1-a4e2-5f2f230a7332",
    "country": "country",
    "street_address": "street_address",
    "city": "city",
    "state": "state",
    "postal_code": "postal_code"
  }
]


[
  {
    "id": "c856dde5-1ca5-49eb-af5d-1d7e2066266a",
    "code": "EUR"
  },
  {
    "id": "941cc3cf-de81-487f-b437-2f3c3d98458d",
    "code": "GBP"
  },
  {
    "id": "8551aa73-aad9-449a-bfae-d7047dce7c2c",
    "code": "USD"
  }
]
1st candidate
{
  "id": "65ce1e74-b082-42df-a26f-413f9392ef09",
  "owner_id": "0132843c-eac9-4925-9006-5146a8907425",
  "first_name": "first",
  "last_name": "candidate",
  "age": 19,
  "department": "Finance",
  "min_salary_expectation": 6,
  "max_salary_expectation": 8,
  "currency_id": "8551aa73-aad9-449a-bfae-d7047dce7c2c",
  "address_id": "2a2e7d26-7dc2-4bd1-a4e2-5f2f230a7332"
}

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMzI4NDNjLWVhYzktNDkyNS05MDA2LTUxNDZhODkwNzQyNSIsImlhdCI6MTcwMTk0NDE1OSwiZXhwIjoxNzAxOTQ3NzU5fQ.xqmMEefqFUugOwDFy-CaaMCXLBBFdQ8JEJi5SE3q12I",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMzI4NDNjLWVhYzktNDkyNS05MDA2LTUxNDZhODkwNzQyNSIsImlhdCI6MTcwMTk0NDE1OSwiZXhwIjoxNzAxOTQ3NzU5fQ.IjJ8iA8yxOR36MfwrJfE4K3zwMBBCPiBD6RnqkN4aJ8"
}


*/
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { join } = require("path");
const connectToDatabase = require("./config/db");

const countryRouter = require("./routes/country.route.js");
const userRouter = require("./routes/User.Router.js");
const candidateRouter = require("./routes/Candidate.Router.js");
const currencyRouter = require("./routes/Currency.Router.js");
const adressRouter = require("./routes/Address.Router.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("Project path :" + __dirname);
app.use("/", express.static(join(__dirname, "public")));

const cors = require("cors");
const corsOptions = { credentials: true, origin: "*" };
app.use(cors(corsOptions));
app.use(cors());
// app.use(function (req, res, next) {
// 	var allowedDomains = [
// 		'http://localhost:3001',

// 	];
// 	var origin = req.headers.origin;

// 	if (allowedDomains.indexOf(origin) > -1) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}

// 	res.setHeader('Access-Control-Allow-Origin', '*');

// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	next();
// });

app.use(express.json());

const apiVersion = "/v1";
app.use(apiVersion, countryRouter);
app.use(apiVersion, userRouter);
app.use(apiVersion, candidateRouter);
app.use(apiVersion, currencyRouter);
app.use(apiVersion, adressRouter);

app.get("/", async (req, res) => {
  try {
    await connectToDatabase();
    console.log("Connection successful. ");
    return res.status(200).json({ message: "Server running" });
  } catch (error) {
    return res.status(500).send("Server error" + error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;
