import { FaTimes } from 'react-icons/fa'
import { deleteModel } from "../../api/api";



export default function Model ({ model, setModel, updateModels }) {
  
  const delete_Model = (id) => {
    deleteModel(model.model_id);
    updateModels();
  }

    return ( 
      <div className='model'> 
        <h5>
          
            {model.model_id}
            <FaTimes
             style={{color:'red', cursor:
             'pointer'}}
             onClick={delete_Model}
             />
              
        </h5>
        <p>{model.upload_time}</p>
        <p>{model.status}</p>
        onClick={() => setModel(model)}
      </div> 
    )
}


