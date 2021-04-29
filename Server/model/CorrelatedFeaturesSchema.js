const CorrFeaturesSchema = new mongoose.Schema({
    
    feature1: String,
    feature2: String,
    x1: Number,
    x2: Number,
    y1: Number,
    y2: Number,
    threshold: Number,
    cx: Number,
    cy: Number

    
  }, {timestamps:true})
