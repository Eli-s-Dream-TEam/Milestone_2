// Imports
const express = require("express");
require("dotenv").config();
const model = require("./controller/model/model");
const models = require("./controller/models/models");
const anomaly = require("./controller/anomaly/anomaly");

// Initialize
const app = express();

// CONSTS
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/model", model);
app.use("/api/models", models);
app.use("/api/anomaly", anomaly);

app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
