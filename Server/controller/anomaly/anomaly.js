const express = require("express");
const router = express.Router();

const { testModel } = require("../../model/Model");

/**
 * @path "/api/anomaly"
 * @method POST
 * @description Trains a model, given the id & train data is correct
 */
router.post("/", async (request, response) => {
  const id = request.query.model_id;
  const data = request.body.predict_data;

  if (!id || !data) {
    response.status(400).json({ message: "Invalid request" });
    return;
  }

  await testModel(id, data)
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      if (error.redirect) {
        response.redirect(error.status, `/api/model?model_id=${id}`);
        return;
      }
      response
        .status(error.status || 500)
        .json({ message: error.message || "Unknown error" });
      return;
    });
});

module.exports = router; // This exports the router object, meaning all the paths that are used in this file
