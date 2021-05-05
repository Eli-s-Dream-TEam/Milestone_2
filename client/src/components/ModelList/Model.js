import { FaTimes } from 'react-icons/fa'
import { deleteModel } from "../../api/api";
import "./Model.css";


export default function Model ({ model, selectedModel, setModel, updateModels }) {
  
  const delete_Model = () => {
    deleteModel(model.model_id);
    updateModels();
  }

  const isSelected = () => model?.model_id === selectedModel?.model_id;

    return ( 
      <li className={`model ${isSelected() ? "selected" : ""}`} onClick={() => setModel(model)}> 
        <h5>
          {model.model_id}
          
        </h5>
        <p>{model.upload_time}</p>
        <p>{model.status}</p>
      <FaTimes
          style={{color:'red', cursor:
          'pointer'}}
          onClick={delete_Model}
          />
      </li> 
    )
}


