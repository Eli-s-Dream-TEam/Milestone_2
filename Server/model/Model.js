const { uid } = require("uid");

let models = [];

let Model = class {
  constructor(id, type, data) {
    this.id = id;
    this.status = "pending";
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

function addModel(type, data) {
  // from /get
  const id = uid();
  models.push(new Model(id, type, data));
  return id;
}

function deleteModel(id) {
  // from /delete
}

function getModel(id) {
  const model = models.find((model) => model.id === id);

  if (!model) {
    return null;
  }

  return {
    model_id: model.id,
    upload_time: model.upload_time,
    status: model.status,
  };
}

function getAllModels() {
  return models.map((model) => getModel(model.id));
}

module.exports = {
  addModel,
  getModel,
  deleteModel,
  getAllModels,
};
