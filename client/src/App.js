// Imports
import "./App.css";
import { useEffect, useState } from "react";
import { getModel } from "./api/api";
import { getAllModels } from "./api/api";
import { deleteModel } from "./api/api";

// Page Layout
import Header from "./components/Header/Header";
import Graph from "./components/Graph/Graph";
import ModelList from "./components/ModelList/ModelList";

function App() {
  const [models, setModels] = useState([]);

  /**
   * @description Updates `models` with data from the server
   */
  async function updateModels() {
    try {
      const data = await getAllModels();
      setModels(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This method fires up only when the app is loaded initially
   */
  useEffect(() => {
    updateModels();
  }, []);


  // Delete Model 
  const delete_Model = (id) => {
    deleteModel(id);
    setModels(models.filter((model) => model.model_id !==id))
  }

  const get_model = (id) => {

  }

  return (
    <div className="App">
      <div className="dashboard">
        <div className="content">
          <Header />
          <div className="grid">
            <div>
              <Graph models={models} />
            </div>
            <div>
              {ModelList.length > 0 ? <ModelList
               models={models}
               onDelete={delete_Model}
               onChoose={get_model}
                /> : 'No Models to Show'}
            </div>
            <div>3</div>
            <div>
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
