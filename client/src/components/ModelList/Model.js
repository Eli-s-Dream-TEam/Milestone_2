import { FaTimes } from 'react-icons/fa'

export default function Model ({ model, onDelete }) {
  
    return ( 
      <div className='model'> 
        <h5>
          
            {model.model_id}
            <FaTimes
             style={{color:'red', cursor:
             'pointer'}}
             onClick={() => onDelete(model.model_id)}
             />
              
        </h5>
        <p>{model.upload_time}</p>
        <p>{model.status}</p>
        
      </div>
    )
}


