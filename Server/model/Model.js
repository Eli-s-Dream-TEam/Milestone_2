const Model = require("./ModelScehma")


/**
 * @param {String} type "hybrid"/"regression"
 * @param {Data} data csv data
 * @returns {String} created model id
 */
function addModel(type, data) {
  new Model({type, status: "pending"}).save(function(err, model) {
    if(err) {
      console.log(err);
      return null;
    }
    return {model_id: model._id, status: model.status, upload_time: model.createdAt};
  })

}

/**
 * @param {String} id
 * @returns {String} 'false' means failed to delete, o.w everything is fine
 */
function deleteModel(id) {
  const mymodel = models.find((model) => model.id === id);
  // No model found
  if (!mymodel) {
    return false;
  }
  models.splice(models.indexOf(mymodel), 1);
  return true;
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