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
  return data_to_anomaly(anomaly, Object.keys(anomaly_data));
}
function merging(span) {
  var clone = [];
  for (var i = 0; i < span.length - 1; i++) {
    // case [start] vs [start]
    if (span[i].length == 1 && span[i + 1].length == 1) {
      // case [x] vs [x]
      if (span[i][0] == span[i + 1][0]) {
        clone.push(span[i]);
        i++;
      } else clone.push(span[i]);
    }
    // case [start] vs [start,end]
    else if (span[i].length == 1 && span[i + 1].length == 2) {
      // case [x] vs [x,y]
      if (span[i][0] == span[i + 1][0]) {
        var b = true; // do nothing
      }
      // case [x-1] vs [x,y]
      else if (span[i][0] + 1 == span[i + 1][0]) {
        span[i + 1][0]--;
      } else clone.push(span[i]);
    }
    // case [start,end] vs [start]
    else if (span[i].length == 2 && span[i + 1].length == 1) {
      // case [x,y] vs [y]
      if (span[i][1] == span[i + 1][0]) {
        clone.push(span[i]);
        i++;
      }
      // case [x,y] vs [y+1]
      else if (span[i][1] + 1 == span[i + 1][0]) {
        span[i][1]++;
        clone.push(span[i]);
        i++;
      }
      // case [x,y] vs [y-1]
      else if (span[i][1] - 1 == span[i + 1][0]) {
        clone.push(span[i]);
        i++;
      } else clone.push(span[i]);
    }
    // case [start,end] vs [start,end]
    else if (span[i].length == 2 && span[i + 1].length == 2) {
      // case [x,y] vs [x,z]
      if (span[i][0] == span[i + 1][0]) {
        var sec = Math.max(span[i][1], span[i + 1][1]);
        span[i + 1][1] = sec;
      }
      // case [x,y] vs [y,z] or [x,y] vs [y+1,z]
      else if (
        span[i][1] == span[i + 1][1] ||
        span[i][1] + 1 == span[i + 1][1]
      ) {
        span[i][1] = span[i + 1][1];
        clone.push(span[i]);
        i++;
      }
      // case [x,y] vs [a,b]: x<a
      else if (span[i][0] < span[i + 1][0]) {
        //case b<=y
        if (span[i][1] >= span[i + 1][1]) {
          clone.push(span[i]);
          i++;
        }
        // case y>b
        else if (span[i][1] > span[i + 1][1]) {
          span[i][1] = span[i + 1][1];
          clone.push(span[i]);
          i++;
        } else clone.push(span[i]);
      } else clone.push(span[i]);
    } else clone.push(span[i]);
  }
  if (
    span[span.length - 1][0] - 1 >
    span[span.length - 2][span[span.length - 2].length - 1]
  )
    clone.push(span[span.length - 1]);
  clone.sort();
  return clone;
}
function data_to_anomaly(anomal, anomKeys) {
  var completeAnomaly = {};
  var anomaly = {};
  var time = anomal[0].timeStep;
  var firstTime = time;
  var prevTime = time;
  var lastTime = 0;
  var index = anomal[0].description.indexOf("-");
  var firAno = anomal[0].description.substring(0, index - 1);
  var secAno = anomal[0].description.substring(index + 2);
  for (var i = 1; i < anomal.length; i++) {
    time = anomal[i].timeStep;
    if (time - prevTime == 1) {
      prevTime = time;
    } else {
      lastTime = prevTime;
      var indexPair = [];
      // make [start, end] if both equal then only [start]
      indexPair.push(firstTime);
      if (lastTime != firstTime) indexPair.push(lastTime);
      // insert to anomaly
      var firstFlag = 0;
      var secondFlag = 0;
      // cut the description into two strings
      for (var property in anomaly) {
        // if there is already a key in anomaly insert a new pair
        if (property == firAno) {
          var temp = anomaly[property];
          temp.push(indexPair);
          anomaly[property] = temp;
          firstFlag = 1;
        } else if (property == secAno) {
          const pairClone = JSON.parse(JSON.stringify(indexPair));
          var temp = anomaly[property];
          temp.push(pairClone);
          anomaly[property] = temp;
          secondFlag = 1;
        }
      }
      // if it didnt find the key: make a new one
      if (firstFlag == 0) {
        var first = [indexPair];
        anomaly[firAno] = first;
      }
      if (secondFlag == 0) {
        const pairClone = JSON.parse(JSON.stringify(indexPair));
        var second = [pairClone];
        anomaly[secAno] = second;
      }
      // prepare for next iterate
      index = anomal[i].description.indexOf("-");
      firAno = anomal[i].description.substring(0, index - 1);
      secAno = anomal[i].description.substring(index + 2);
      firstTime = time;
      prevTime = time;
    }
  }
  lastTime = prevTime;
  var indexPair = [];
  // make [start, end] if both equal then only [start]
  indexPair.push(firstTime);
  if (lastTime != firstTime) indexPair.push(lastTime);
  // insert to anomaly
  firstFlag = 0;
  secondFlag = 0;

  // cut the description into two strings
  var num = anomal.length - 1;
  index = anomal[num].description.indexOf("-");
  firAno = anomal[num].description.substring(0, index - 1);
  secAno = anomal[num].description.substring(index + 2);
  for (var property in anomaly) {
    // if there is already a key in anomaly insert a new pair
    if (property == firAno) {
      var temp = anomaly[property];
      temp.push(indexPair);
      anomaly[property] = temp;
      firstFlag = 1;
    } else if (property == secAno) {
      const pairClone = JSON.parse(JSON.stringify(indexPair));
      var temp = anomaly[property];
      temp.push(pairClone);
      anomaly[property] = temp;
      secondFlag = 1;
    }
  }
  // if it didnt find the key: make a new one
  if (firstFlag == 0) {
    var first = [indexPair];
    anomaly[firAno] = first;
  }
  if (secondFlag == 0) {
    var second = [indexPair];
    anomaly[secAno] = second;
  }

  // sort and merge every Span
  for (var property in anomaly) {
    anomaly[property].sort();
    var myspan = anomaly[property];
    var clo = merging(myspan);
    anomaly[property] = clo;
  }
  // add empty array for non anomaly features
  for (var i = 0; i < anomKeys.length; i++) {
    if (!(anomKeys[i] in anomaly)) anomaly[anomKeys[i]] = [];
  }
  completeAnomaly.anomalies = anomaly;
  completeAnomaly.reason = "beacuse we must write one";
  return completeAnomaly;
}

module.exports = {
  learn,
  detect,
};
