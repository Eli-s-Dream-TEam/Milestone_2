import Model from './Model'

export default function ModelList({ models }) {
  return (
    <ul>
      {models?.map((model) => (
        <li model key={model.model_id} model={model} />
      ))}   
    </ul>
  );
}


