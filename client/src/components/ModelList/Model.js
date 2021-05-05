import { FaTimes } from 'react-icons/fa'

export default function Model ({ model }) {
  
    return ( 
      <div> 
        <h3>
            {model.model_id}<FaTimes />
        </h3>
          <p>{model.createdAt}</p>
      </div>
    )
}


