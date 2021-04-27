// Imports
const express = require("express");
const router = express.Router();
const { getModel, addModel } = require("../../model/Model");

// Route: /api/model

router.post("/", (request, response) => {
  const body = request.body;
  const query = request.query;

  if (query.model_id) {
    // return ML fODEor that id
  }

  if (!query.model_type || !body.train_data) {
    response.status(400).json({ message: "Bad request" });
  }

  const id = addModel(query.model_type, body.train_data);

  response.status(200).json(getModel(id));
});

router.get("/", (request, response) => {
  const query = request.query;

  if (!query.model_id) {
    response.status(400).json({ message: "Please provide a model id" });
  }

  const model = getModel(query.model_id);

  if (!model) {
    response
      .status(400)
      .json({ message: "Not a valid model id, please try again" });
  }

  response.status(200).json(model);
});

router.delete("/", (request, response) => {
  const query = request.query;

  if (!query.model_id) {
    response.status(400).json({ message: "Bad request" });
  }

  // Delete model

  response.status(200).json({ message: "placeholder" });
});

module.exports = router;
