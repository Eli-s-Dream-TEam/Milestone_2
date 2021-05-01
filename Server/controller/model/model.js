// Imports
const express = require("express");
const router = express.Router();
const { getModel, addModel, deleteModel } = require("../../model/Model");

// Route: /api/model

/**
 * @path /api/model
 * @method POST
 * @description Creates and trains a new model
 */
router.post("/", async (request, response) => {
  const body = request.body;
  const query = request.query;

  if (query.model_id) {
    // return status for that id
  }

  // Invalid request check
  if (!query.model_type || !body.train_data) {
    response.status(400).json({ message: "Bad request" });
    return;
  }

  const type = query.model_type;
  const data = body.train_data;

  // Invalid type check
  if (type !== "hybrid" && type !== "regression") {
    response.status(400).json({ message: "Invalid model type provided" });
    return;
  }

  const model = await addModel(type, data);

  // Data base error
  if (!model) {
    response.status(500).json({ message: "Database error" });
    return;
  }

  // Model added
  response.status(200).json(model);
});

/**
 * @path /api/model
 * @method GET
 * @description Retrieves a model, given the model_id inside query is valid
 */
router.get("/", async (request, response) => {
  const query = request.query; // get query object

  // If id wasn't provided - bad request
  if (!query.model_id) {
    response.status(400).json({ message: "Please provide a model id" });
    return;
  }

  // Get the model from the database
  const model = await getModel(query.model_id);
  // The model is null = the id is not valid
  if (model == null) {
    
    response.status(400).json({ message: "Not a valid model id, please try again" });
    return;
  }
  
  // Return the model
  response.status(200).json(model);
});

/**
 * @path /api/model
 * @method DELETE
 * @description Deletes a model, given the model_id inside the query object
 */
router.delete("/", async (request, response) => {
  const query = request.query; // get query object

  if (!query.model_id) {
    response.status(400).json({ message: "Bad request" });
    return;
  }

  // Delete model
  model = await deleteModel(query.model_id);
  if (!model) {
    response
      .status(400)
      .json({ message: "Not a valid model id, please try again" });
  } else {
    response.status(200).json({ message: "Model deleted" });
  }
});

module.exports = router; // This exports the router object, meaning all the paths that are used in this file
