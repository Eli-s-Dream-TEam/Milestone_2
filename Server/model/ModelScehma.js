const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    
    status : String, // this will change from trainModel()
    type: String // string "hybrid" or "regression"

  }, {timestamps:true});

  const Model = mongoose.model('Model', modelSchema);

  module.exports = Model;