import { ANOMALY_URI, MODEL_URI, MODELS_URI } from "./utils";

/**
 * @param {Object} data
 * @param {String} type
 * @returns {Object}
 */
export const addModel = async (data, type) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(MODEL_URI + `?model_type=${type}`, config);

  return response.json();
};

/**
 * @param {String} id
 * @returns {Object}
 */
export const getModel = async (id) => {
  const config = {
    method: "GET",
  };

  const response = await fetch(MODEL_URI + `?model_id=${id}`, config);

  return response.json();
};

export const deleteModel = async (id) => {
  const config = {
    method: "DELETE",
  };

  const response = await fetch(MODEL_URI + `?model_id=${id}`, config);

  return response.json();
};

/**
 * @returns {Object}
 */
export const getAllModels = async () => {
  const config = {
    method: "GET",
  };

  const response = await fetch(MODELS_URI, config);

  return response.json();
};

/**
 * @param {Object} data parsed csv test data
 * @param {String} id An existing model id
 */
export const testModel = async (data, id) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(ANOMALY_URI + `?model_id=${id}`, config);
    if (!response.ok) {
      throw response;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
