// Imports
import "./App.css";
import { isValidElement, useEffect, useState } from "react";
import { getAllModels } from "./api/api";
import JSONDATA from "./MOCK_DATA.json"

// Page Layout
import Header from "./components/Header/Header";
import Graph from "./components/Graph/Graph";
import ModelList from "./components/ModelList/ModelList";
//import SearchBar from "./components/ModelList/SearchBar"

function App() {
  const [anomalies, setAnomalies] = useState([]);
  const [models, setModels] = useState([]);

  
  /**
   * This method fires up only when the app is loaded initially
   */
  useEffect(() => {
    getModels();
  }, []);


  const getModels = async () => {
    try {
    const res = await getAllModels();
    setModels(res);
    } catch(e) {
      console.log(e);
    }
  }


  return (
    <div className="App">
      <div className="dashboard">
        <div className="content">
          <Header />
          <div className="grid">
            <div>
              <Graph anomalies={anomalies} />
            </div>
            <div>

              <ModelList models={models} />
            </div>
            <div>

            </div>
            <div>4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
