import React, { useState } from "react";
import Map from "./components/Map";
import "./App.css";
import { Map as LeafletMapData } from "leaflet";
import { LatLngExpression } from "leaflet";
import MapApiDataLayer from "./components/MapDataLayer";

// In production, talk to production. In development, prefer REACT_APP_API_URL variable
// (e.g. from command `REACT_APP_API_URL=localhost:8000 npm start`)
// Otherwise fall back to production server
const API_URL =
  process.env.NODE_ENV === "production" || !process.env.REACT_APP_API_URL
    ? "https://car-dependence-backend.herokuapp.com/api/route/"
    : process.env.REACT_APP_API_URL;
if (process.env.NODE_ENV !== "production")
  console.info(`Using API endpoint ${API_URL}`);

// Fill screen
const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };

// Default values (Portland)
const INITIAL_LAT_LON = [45.5051, -122.675] as LatLngExpression;
const INITIAL_ZOOM = 13;

function App() {
  // gets initiated by React-Leaflet in whenCreated
  const [mapState, setMapState] = useState(null as LeafletMapData | null);

  return (
    <div className="App">
      <Map
        style={MAP_FILL_SCREEN_STYLE}
        center={INITIAL_LAT_LON}
        zoom={INITIAL_ZOOM}
        // sets up the useState hook so we can monitor Leaflet state externally
        whenCreated={setMapState}
      >
        {mapState && <MapApiDataLayer mapState={mapState} url={API_URL} />}
      </Map>
    </div>
  );
}

export default App;
