import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

//0 - reg, 1 - anomaly.
const COLORS = ["#282828", "#8899a6"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

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
  if (selectedFeature == undefined) {
    return <h2>please choose a feature below after testing the flight data</h2>;
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
        <div>
          <p>start : {payload[0]["payload"]["payload"]["start"]}</p>
          <p>end : {payload[0]["payload"]["payload"]["end"]}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          data={completeGraphData}
          cx="50%"
          cy="50%"
          labelLine={false}
          // label={renderCustomizedLabel}
          outerRadius={300}
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
