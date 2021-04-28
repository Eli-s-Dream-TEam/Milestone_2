// Imports
const express = require("express");
const router = express.Router();
const { getModel, addModel } = require("../../model/Model");

// Route: /api/model

/**
 * @path /api/model
 * @method POST
 * @description Creates and trains a new model
 */
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

/**
 * @path /api/model
 * @method GET
 * @description Retrieves a model, given the model_id inside query is valid
 */
router.get("/", (request, response) => {
  const query = request.query; // get query object

  // If id wasn't provided - bad request
  if (!query.model_id) {
    response.status(400).json({ message: "Please provide a model id" });
  }

  // Get the model from the database
  const model = getModel(query.model_id);

  // The model is null = the id is not valid
  if (!model) {
    response
      .status(400)
      .json({ message: "Not a valid model id, please try again" });
  }

  // Return the model
  response.status(200).json(model);
});

/**
 * @path /api/model
 * @method DELETE
 * @description Deletes a model, given the model_id inside the query object
 */
router.delete("/", (request, response) => {
  const query = request.query; // get query object

  if (!query.model_id) {
    response.status(400).json({ message: "Bad request" });
  }

  // Delete model
  flag = deleteModel(query.model_id);
  if (flag === "false") {
    response
      .status(400)
      .json({ message: "Not a valid model id, please try again" });
  }
  else {
    response.status(200).json({ message: "Model delete complete" });
  }
});

module.exports = router; // This exports the router object, meaning all the paths that are used in this file
