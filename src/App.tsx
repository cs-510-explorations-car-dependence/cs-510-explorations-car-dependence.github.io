import React from "react";
import Map from "./components/Map";
import "./App.css";
import { Polyline, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import {
  useFetch,
  IfPending,
  IfFulfilled,
  IfRejected,
  AsyncState,
} from "react-async";

// TODO
type ServerResponse = {
  route: LatLngExpression[];
} & Response;

// In production, talk to production. In development, prefer REACT_APP_API_URL variable
// (e.g. from command `REACT_APP_API_URL=localhost:8000 npm start`)
// Otherwise fall back to production server
const API_URL =
  process.env.NODE_ENV === "production" || !process.env.REACT_APP_API_URL
    ? "https://car-dependence-backend.herokuapp.com/api/route/"
    : process.env.REACT_APP_API_URL;

const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };

function App() {
  // useFetch needs the application/json header to parse response properly
  // Server doesn't actually care
  const apiState: AsyncState<ServerResponse> = useFetch(API_URL, {
    headers: { accept: "application/json" },
  });

  return (
    <div className="App">
      <Map style={MAP_FILL_SCREEN_STYLE}>
        <IfPending state={apiState}>Loading...</IfPending>
        <IfRejected state={apiState}>Error Message</IfRejected>
        <IfFulfilled state={apiState}>
          <Polyline positions={apiState.data?.route!}>
            <Tooltip direction="bottom" offset={[0, 20]} permanent />
          </Polyline>
        </IfFulfilled>
      </Map>
    </div>
  );
}

export default App;
