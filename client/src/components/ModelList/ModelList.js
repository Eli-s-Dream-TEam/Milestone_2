import Model from "./Model";
import "./Model.css";
import * as ReactBootStrap from "react-bootstrap";

export default function ModelList({ models, model, setModel, updateModels }) {
  // Delete Model

  return (
    <div className="container">      
      <ul className="model-list">
        {models?.map((thisModel) => (
          <Model
            key={thisModel.model_id}
            model={thisModel}
            selectedModel={model}
            setModel={setModel}
            updateModels={updateModels}
          />          
        ))}            
      </ul>
    </div>
  );
}
