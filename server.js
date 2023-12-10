"use strict";
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const { join } = require("path");
const connectToDatabase = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRouter = require("./routes/User.Router.js");
const candidateRouter = require("./routes/Candidate.Router.js");
const currencyRouter = require("./routes/Currency.Router.js");
const adressRouter = require("./routes/Address.Router.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("Project path :" + __dirname);
app.use("/", express.static(join(__dirname, "public")));
app.use(cookieParser());

const cors = require("cors");
const corsOptions = { credentials: true, origin: "*" };
app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

const apiVersion = "/v1";
app.use(apiVersion, userRouter);
app.use(apiVersion, candidateRouter);
app.use(apiVersion, currencyRouter);
app.use(apiVersion, adressRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
