const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    name: String,
    data: Array[Number],
    
  }, {timestamps:true})

  module.exports = dataModel;