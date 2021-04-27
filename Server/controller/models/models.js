// Imports
const express = require("express");
const router = express.Router();
const { getAllModels } = require("../../model/Model");

// Route: /api/models

router.get("/", (request, response) => {
  response.status(200).json(getAllModels());
});

module.exports = router;
