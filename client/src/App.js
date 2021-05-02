// Imports
import "./App.css";
import { useEffect, useState } from "react";
import { getAllModels } from "./api/api";

// Page Layout
import Header from "./components/Header/Header";
import Graph from "./components/Graph/Graph";
import ModelList from "./components/ModelList/ModelList";

function App() {
  const [anomalies, setAnomalies] = useState([]);

  /**
   * @description Updates setAnomalies with data from the server
   */
  async function updateAnomalies() {
    try {
      const data = await getAllModels();
      setAnomalies(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This method fires up only when the app is loaded initially
   */
  useEffect(() => {
    updateAnomalies();
  }, []);

  return (
    <div className="App">
      <div className="dashboard">
        <div className="content">
          <Header />
          <div className="grid">
            <div>
              <Graph anomalies={anomalies} />
            </div>
            <div>2</div>
            <div>
              <ModelList anomalies={anomalies} />
            </div>
            <div>4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
