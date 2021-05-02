export default function Graph({ anomalies }) {
  return (
    <>
      <h1>This is from graph</h1>
      <ul>
        {anomalies.map((anomaly, index) => (
          <li key={`anomaly-${index}`}>graph - {anomaly.model_id}</li>
        ))}
      </ul>
    </>
  );
}
