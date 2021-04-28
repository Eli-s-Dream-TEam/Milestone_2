import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <div className="dashboard">
        <div className="content">
          <Header />
          <div className="grid">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
