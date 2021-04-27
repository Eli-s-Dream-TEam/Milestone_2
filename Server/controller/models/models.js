// Imports
const express = require("express");
const router = express.Router();
const { getAllModels } = require("../../model/Model");

/**
 * @path "/api/models"
 * @method GET
 * @description Retrieves all the models in the database
 */
router.get("/", (request, response) => {
  response.status(200).json(getAllModels());
});

module.exports = router; // This exports the router object, meaning all the paths that are used in this file
