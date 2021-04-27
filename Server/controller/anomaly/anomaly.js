const express = require("express");
const router = express.Router();

/**
 * @path "/api/anomaly"
 * @method POST
 * @description Trains a model, given the id & train data is correct
 */
router.post("/", (request, response) => {
  const query = request.query;
  const body = request.body;

  // If query.model_id status is "pending" => redirect
  // else find and return ANOMALY[]
  response.status(200).json({ message: "hey" });
});

module.exports = router; // This exports the router object, meaning all the paths that are used in this file
