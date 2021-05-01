const cor = require("./pearsonCorrelation");
const enclosingCircle = require("smallest-enclosing-circle");

function learn(train_data, type, callback) {
  var allCorrelated = [];
  var numOfFeature = 0;
  for (var key in train_data) {
    numOfFeature++;
  }
  var numOfRow = Object.values(train_data)[0].length;

  var vals = new Array(numOfFeature);
  for (var i = 0; i < vals.length; i++) {
    vals[i] = [];
  }

  for (var i = 0; i < numOfFeature; i++) {
    var x = new Array();
    x = Object.values(train_data)[i];
    for (var j = 0; j < numOfRow; j++) {
      vals[i][j] = x[j];
    }
  }
  for (var i = 0; i < numOfFeature - 1; i++) {
    var f1 = Object.keys(train_data)[i];
    var max = 0;
    var jmax = 0;
    for (var j = i + 1; j < numOfFeature; j++) {
      var p = cor.pearsonCorrelation(vals, i, j);
      if (p > max) {
        max = p;
        jmax = j;
      }
    }
    var f2 = Object.keys(train_data)[jmax];
    for (var property in train_data) {
      if (property == f1) {
        var ff1 = train_data[property];
      } else if (property == f2) {
        var ff2 = train_data[property];
      }
    }
    if (type == "regrssion") {
      //assign to correlated
      var correlated = {};
      if (max > 0.9) {
        // if hybrid so 0.5
        correlated.feature1 = f1;
        correlated.feature2 = f2;
        correlated.corrlation = max;
        var cl = cor.linearRegression(ff2, ff1);
        correlated.line_reg = cl;
        mmax = 0;
        for (var j = 0; j < numOfRow; j++) {
          var d = Math.abs(ff2[j] - (cl.slope * ff1[j] + cl.intercept));
          if (d > mmax) {
            mmax = d;
          }
        }
        correlated.threshold = mmax;
        allCorrelated.push(correlated);
      }
    } else if (type == "hybrid") {
      var correlated = {};
      if (max > 0.5) {
        correlated.feature1 = f1;
        correlated.feature2 = f2;
        correlated.corrlation = max;
        var point = [];
        for (var a = 0; a < numOfRow; a++) {
          point[a] = { x: ff1[a], y: ff2[a] };
        }
        var circle = enclosingCircle(point);
        correlated.threshold = circle.r;
        correlated.cx = circle.x;
        correlated.cy = circle.y;
        allCorrelated.push(correlated);
      }
    }
  }
  callback && callback(allCorrelated);
}
function detect(corr, anomaly_data, type) {
  var anomaly = [];
  for (var j = 0; j < corr.length; j++) {
    for (var property in anomaly_data) {
      if (property == corr[j].feature1) {
        var myx = anomaly_data[property];
      } else if (property == corr[j].feature2) {
        var myy = anomaly_data[property];
      }
    }
    var size = myx.length;
    for (var i = 0; i < size; i++) {
      if (type == "regression") {
        var ab = Math.abs(
          myy[i] - corr[j].line_reg.slope * myx[i] + corr[j].line_reg.intercept
        );
        if (ab > corr[j].threshold) {
          var anomalyReport = {};
          var st = corr[j].feature1 + " - " + corr[j].feature2;
          anomalyReport.description = st;
          anomalyReport.timeStep = i + 1;
          anomaly.push(anomalyReport);
        }
      } else if (type == "hybrid") {
        //find distance
        var aa = corr[j].cx - myx[i];
        var bb = corr[j].cy - myy[i];
        var dist = Math.sqrt(aa * aa + bb * bb);
        if (dist > corr[j].threshold) {
          var anomalyReport = {};
          var st = corr[j].feature1 + " - " + corr[j].feature2;
          anomalyReport.description = st;
          anomalyReport.timeStep = i + 1;
          anomaly.push(anomalyReport);
        }
      }
    }
  }
  return anomaly;
}

module.exports = {
  learn,
  detect,
};
