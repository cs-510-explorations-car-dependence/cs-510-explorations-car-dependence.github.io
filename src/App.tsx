import React from "react";
import Map from "./components/Map";
import "./App.css";
import { Polyline, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const polyline = [
  [45.5, -122.7],
  [45.52, -122.72],
  [45.49, -122.68],
] as LatLngExpression[];

function App() {
  return (
    <div className="App">
      <Map>
        <Polyline positions={polyline}>
          <Tooltip direction="bottom" offset={[0, 20]} permanent>
            Test tooltip
          </Tooltip>
        </Polyline>
      </Map>
    </div>
  );
}

export default App;
