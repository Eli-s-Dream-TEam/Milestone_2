// Imports
const express = require("express"); // Get the express library
require("dotenv").config(); // This is for the .env (enviornment variables) file, it fetches it basically

// Routers
const model = require("./controller/model/model"); // Get all the '/api/model' routes
const models = require("./controller/models/models"); // Get all the '/api/models' routes
const anomaly = require("./controller/anomaly/anomaly"); // Get all the '/api/anomaly' routes

// Initialize
const app = express(); // Creates the server object

// CONSTS
const PORT = process.env.PORT || 3000; // "Get the port from .env file, or default to 3000"

// Middleware (All requests will pass through these)
app.use(express.json()); // Enables the app to read and write in json format

// Routes
app.use("/api/model", model);
app.use("/api/models", models);
app.use("/api/anomaly", anomaly);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
