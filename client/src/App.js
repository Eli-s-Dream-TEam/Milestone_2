// Imports
import "./App.css";
import { useEffect, useState } from "react";
import { getAllModels } from "./api/api";


// Page Layout
import Header from "./components/Header/Header";
import Graph from "./components/Graph/Graph";
import ModelList from "./components/ModelList/ModelList";
import FileHandler from "./components/FileHandler/FileHandler";

function App() {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState()

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
               setModel={setModel}
               updateModels={updateModels}              
              
                /> : 'No Models to Show'}
            </div>
            <div>3</div>
            <div>
              <FileHandler
              updateModels={updateModels}
            
              />
                      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
