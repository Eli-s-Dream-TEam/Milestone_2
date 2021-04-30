const Model = require("./ModelScehma");

/**
 * @param {String} type "hybrid"/"regression"
 * @param {Data} data csv data
 * @returns {Object} Model data
 */
async function addModel(type, data) {
  try {
    const newModel = new Model({ type, status: "pending" });
    const savedModel = await newModel.save();
    return {
      model_id: savedModel._id,
      status: savedModel.status,
      upload_time: savedModel.createdAt,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * @param {String} id
 */
function getModel(id) {}

/**
 * @param {String} id
 * @returns {String} 'false' means failed to delete, o.w everything is fine
 */
function deleteModel(id) {}

/**
 * @returns {Array[Model]}
 */
function getAllModels() {}

// Only functions exported here can be used outside this file (once imported)
module.exports = {
  addModel,
  getModel,
  deleteModel,
  getAllModels,
};
