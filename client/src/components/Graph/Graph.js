import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { value: 2, anomaly: true, start: 5, end: 7 },
  { value: 20, anomaly: false },
  { value: 400, anomaly: true },
  { value: 500, anomaly: false },
  { value: 300, anomaly: true },
  { value: 1000, anomaly: false },
  { value: 15, anomaly: false },
  { value: 20, anomaly: true },
  { value: 200, anomaly: false },
];

//0 - reg, 1 - anomaly.
const COLORS = ["#282828", "#8899a6"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Graph({ selectedFeature, anomalies }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.anomaly ? COLORS[0] : COLORS[1]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

// export default function Graph({ selectedFeature, anomalies }) {
//   console.log(anomalies)
//   console.log(selectedFeature)

//   return (

//   );
// }
