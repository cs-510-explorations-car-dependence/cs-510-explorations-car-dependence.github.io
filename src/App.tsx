import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import "./App.css";
import { Map as LeafletMapData } from "leaflet";
import { LatLngExpression } from "leaflet";
import { IfPending, IfFulfilled, IfRejected } from "react-async";
import MapApiDataLayer from "./components/MapDataLayer";

// TODO
// const API_URL = "https://car-dependence-backend.herokuapp.com/api/route/";
// const API_URL = "https://jsonplaceholder.typicode.com/todos/";
const API_URL = "https://httpbin.org/post";

const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };

// Portland
const INITIAL_LAT_LON = [45.5051, -122.675] as LatLngExpression;
const INITIAL_ZOOM = 13;

function App() {
  const [mapState, setMapState] = useState(null as LeafletMapData | null);

  return (
    <div className="App">
      <Map
        style={MAP_FILL_SCREEN_STYLE}
        center={INITIAL_LAT_LON}
        zoom={INITIAL_ZOOM}
        whenCreated={setMapState}
      >
        {mapState && <MapApiDataLayer mapState={mapState} url={API_URL} />}
      </Map>
    </div>
  );
}

export default App;
