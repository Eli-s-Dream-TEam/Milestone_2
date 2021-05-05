import Model from './Model'

export default function ModelList({ models, setModel, updateModels}) {
 // Delete Model 



  return (
    <>      
      {models?.map((model) => (
        <Model key={model.model_id} model={model}
        setModel={setModel}
        updateModels={updateModels} />
      ))}  
    </>
  );
}
