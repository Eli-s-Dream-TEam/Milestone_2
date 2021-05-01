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
 async function getModel(id) {

  try {
    const foundModel = await Model.findById(id);
    return {
      model_id: foundModel._id,
      upload_time: foundModel.createdAt,
      status: foundModel.status
    };
    
  } catch(err) {
    console.log(err);
    return null;
  } 

}

/**
 * @param {String} id
 * @returns {String} 'false' means failed to delete, o.w everything is fine
 */
 async function deleteModel(id) {

  try {
    const deletedModel = await Model.findByIdAndDelete(id);
    return deletedModel;
  } catch(err) {
    console.log(err);
    return null;
  }     
}


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
