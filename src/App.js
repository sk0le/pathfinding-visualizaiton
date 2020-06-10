import React from "react";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";

function App() {
  return (
    <div className="App">
      <h1 className="happ">Screen Width is too small!!</h1>
      <SortingVisualizer />
    </div>
  );
}

export default App;
