import React from "react";
import "./App.css";
import Nav from "../src/components/Nav/Nav";
import MapCom from "../src/components/Map/MapCom";
import Title from "../src/components/Titlepage/Title";



function App() {
  return (
    <div className="App">
      <Nav/>
      {/*<MapCom/>*/}
      <Title/>
    </div>
  );
}

export default App;
