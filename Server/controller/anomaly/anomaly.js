const express = require("express");
const router = express.Router();

// Route : /api/anomaly

router.post("/", (request, response) => {
  const query = request.query;
  const body = request.body;

  // If query.model_id status is "pending" => redirect
  // else find and return ANOMALY[]
  response.status(200).json({ message: "hey" });
});

module.exports = router;
