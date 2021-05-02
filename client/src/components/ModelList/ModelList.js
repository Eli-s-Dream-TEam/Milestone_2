export default function ModelList(props) {
  return (
    <>
      <h1>This is from modelist</h1>
      <ul>
        {props.anomalies.map((anomaly, index) => (
          <li key={`anomaly-${index}`}>list - {anomaly.model_id}</li>
        ))}
      </ul>
    </>
  );
}
