const { uid } = require("uid");

let models = [];

let Model = class {
  constructor(id, type, data) {
    this.id = id;
    this.status = "pending"; // this will change from trainModel()
    this.type = type; // string "hybrid" or "regression"
    this.upload_time = new Date().toISOString(); //21-04-22T19:15:32+02.00
    this.trainModel(data);
  }

  trainModel(data) {
    // .. open thread train the csv
    this.status = "ready";
  }

  testModel(data) {
    if (this.status === "ready") {
    }
  }
};

/**
 * @param {String} type "hybrid"/"regression"
 * @param {Data} data csv data
 * @returns {String} created model id
 */
function addModel(type, data) {
  // from /get
  const id = uid(); // generates random id
  models.push(new Model(id, type, data));
  return id;
}

/**
 * @param {String} id
 */
function deleteModel(id) {
  // from /delete
}

/**
 * @param {String} id
 */
function getModel(id) {
  // Finds the model by the provided id, model is null if none is found
  const model = models.find((model) => model.id === id);

  // No model found
  if (!model) {
    return null;
  }

  // Return an abbreviated version of the model
  return {
    model_id: model.id,
    upload_time: model.upload_time,
    status: model.status,
  };
}

/**
 * @returns {Array[Model]}
 */
function getAllModels() {
  return models.map((model) => getModel(model.id));
}

// Only functions exported here can be used outside this file (once imported)
module.exports = {
  addModel,
  getModel,
  deleteModel,
  getAllModels,
};
