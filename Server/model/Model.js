const { learn, detect } = require("../lib/AnomalyDetector");
const Model = require("./ModelScehma");

/**
 * @description Learns the correlation from AnomalyDetector.learn(), updates the Model document
 * @param {String} id
 * @param {StringConstructor} type
 * @param {Object} data
 */
function trainModel(id, type, data) {
  learn(data, type, async (correlatedFeatures) => {
    try {
      await Model.findByIdAndUpdate(
        id,
        {
          status: "ready",
          correlatedFeatures: correlatedFeatures,
        },
        { useFindAndModify: false }
      );

      console.log(`Model finished learning: ${id}`);
    } catch (error) {
      console.log(`Couldn't update model: ${id}`);
      console.log(error);
    }
  });
}

/**
 * @param {String} id
 * @param {Object} data
 * @returns
 */
function testModel(id, data) {
  return new Promise(async (resolve, reject) => {
    const model = await Model.findById(id);

    // No model found
    if (!model) {
      reject({ message: "A model with that ID was not found", status: 400 });
      return;
    }

    // Model is still training
    if (model.status === "pending") {
      reject({
        message: "The model is still pending",
        redirect: true,
        status: 301,
      });
      return;
    }

    // Test data < train data
    if (Object.values(data).length < model.numberOfFeatures) {
      reject({
        message:
          "The test data is shorter than the train data, please upload a suitable file",
        status: 400,
      });
      return;
    }

    const anomalies = detect(model.correlatedFeatures, data, model.type);
    resolve(anomalies);
  });
}

/**
 * @param {String} type "hybrid"/"regression"
 * @param {Data} data csv data
 * @returns {Object} Model data
 */
async function addModel(type, data) {
  try {
    const newModel = new Model({
      type,
      status: "pending",
      numberOfFeatures: Object.values(data).length,
    });
    const savedModel = await newModel.save();
    trainModel(savedModel._id, type, data);

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
      status: foundModel.status,
    };
  } catch (err) {
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
    return {
      model_id: deletedModel._id,
      status: deletedModel.status,
      upload_time: deletedModel.createdAt,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * @returns {Array[Model]}
 */
async function getAllModels() {
  try {
    const models = await Model.find();
    return models.map((model) => ({
      model_id: model._id,
      status: model.status,
      upload_time: model.createdAt,
    }));
  } catch (error) {
    throw error;
  }
}

// Only functions exported here can be used outside this file (once imported)
module.exports = {
  addModel,
  getModel,
  deleteModel,
  getAllModels,
  testModel,
};
