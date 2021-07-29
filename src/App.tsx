import React from "react";
import Map from "./components/Map";
import "./App.css";
import { Map as LeafletMapData } from "leaflet";
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

// Portland
const INITIAL_LAT_LON = [45.5051, -122.675] as LatLngExpression;
const INITIAL_ZOOM = 13;

const getBBox = ({ map }: { map: }) => {

}

function App() {
  const [mapState, setMapState] = React.useState(null as LeafletMapData?);
  const apiState: AsyncState<ServerResponse> = useFetch(API_URL, {
    headers: { accept: "application/json" },
  });
  apiState.run({});

  return (
    <div className="App">
      <Map style={MAP_FILL_SCREEN_STYLE} center={INITIAL_LAT_LON} zoom={13} whenCreated={setMapState}>
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
