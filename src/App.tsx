import React from "react";
import Map from "./components/Map";
import "./App.css";
import { Polyline, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const TEST_POLYLINE = [
  [45.5, -122.7],
  [45.52, -122.72],
  [45.49, -122.68],
] as LatLngExpression[];

const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };

function App() {
  return (
    <div className="App">
      <Map style={MAP_FILL_SCREEN_STYLE}>
        <Polyline positions={TEST_POLYLINE}>
          <Tooltip direction="bottom" offset={[0, 20]} permanent>
            Test tooltip
          </Tooltip>
        </Polyline>
      </Map>
    </div>
  );
}

export default App;
