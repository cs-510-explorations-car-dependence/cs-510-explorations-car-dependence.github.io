import React, { useState } from "react";
import "./App.css";
import Face from "../src/components/Face/Face";

// Default values (Portland)

function App() {
  // gets initiated by React-Leaflet in whenCreated
  return (
    <div className="App">
      <Face />
    </div>
  );
}

export default App;
