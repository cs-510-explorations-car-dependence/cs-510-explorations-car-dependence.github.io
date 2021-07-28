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

const API_URL = "https://car-dependence-backend.herokuapp.com/api/route/";

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
