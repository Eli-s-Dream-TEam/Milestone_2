import Model from './Model'

export default function ModelList({ models, onDelete }) {
  return (
    <>      
      {models?.map((model) => (
        <Model key={model.model_id} model={model}
        onDelete={onDelete} />
      ))}  
    </>
  );
}
