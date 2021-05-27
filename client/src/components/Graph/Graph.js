import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import "./Graph.css";

const COLORS = ["#4188ff", "#eba42a"];

function generateAnomaliesArray(featureAnomalies) {
  var anomaliesData = [];
  //check if there were no anomalies
  if (!featureAnomalies.length) {
    return anomaliesData;
  }

  // creating the graph data. first adding anomalies.
  for (var index in featureAnomalies) {
    var span = featureAnomalies[index];
    var start = span[0];
    var end = span[1] ? span[1] : span[0];

    anomaliesData.push({
      duration: end - start + 1,
      start: start,
      end: end,
      isAnomaly: true,
    });
  }
  return anomaliesData;
}

function addNormalFlightPeriodsToGraphData(anomaliesData, flightDuration) {
  var completeGraphData = [];
  var lastTimeStamp = 0;
  anomaliesData.forEach((anomaly) => {
    var anomalyStartingTime = anomaly.start;
    var regFlightSectionDuration = anomalyStartingTime - 1 - lastTimeStamp;
    //adding normal section of flight.
    completeGraphData.push({
      duration: regFlightSectionDuration,
      start: lastTimeStamp + 1,
      end: lastTimeStamp + regFlightSectionDuration,
      isAnomaly: false,
    });
    //adding anomaly
    completeGraphData.push(anomaly);
    lastTimeStamp = completeGraphData[completeGraphData.length - 1]["end"];
  });

  //adding final section of flight
  completeGraphData.push({
    duration: flightDuration - lastTimeStamp,
    start: lastTimeStamp + 1,
    end: flightDuration,
    isAnomaly: false,
  });
  return completeGraphData;
}

function extractFeatureAnomalies(anomalies, selectedFeature) {
  for (var key in anomalies["anomalies"]) {
    if (key === selectedFeature) {
      var featureAnomalies = anomalies["anomalies"][key];
    }
  }
  return featureAnomalies;
}

export default function Graph({ selectedFeature, anomalies, flightDuration }) {
  //handling the first page load.
  if (selectedFeature === undefined) {
    return (
      <div className="placeholder">
        <h2>Please choose a feature below after testing the flight data</h2>
      </div>
    );
  }

  var featureAnomalies = extractFeatureAnomalies(anomalies, selectedFeature);

  var anomaliesData = generateAnomaliesArray(featureAnomalies);

  var completeGraphData = addNormalFlightPeriodsToGraphData(
    anomaliesData,
    flightDuration
  );

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="tooltip-container">
          <p>anomaly : {payload[0]?.payload?.payload?.isAnomaly.toString()}</p>
          <p>start : {payload[0]?.payload?.payload?.start}</p>
          <p>end : {payload[0]?.payload?.payload?.end}</p>
          <p>duration : {payload[0]?.payload?.payload?.duration}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="80%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={completeGraphData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="duration"
        >
          {completeGraphData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.isAnomaly ? COLORS[0] : COLORS[1]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
