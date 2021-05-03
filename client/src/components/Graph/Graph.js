export default function Graph({ models }) {
  return (
    <>
      <h1>This is from graph</h1>
      <ul>
        {models.map((model, index) => (
          <li key={`model-${index}`}>graph - {model.model_id}</li>
        ))}
      </ul>
    </>
  );
}
