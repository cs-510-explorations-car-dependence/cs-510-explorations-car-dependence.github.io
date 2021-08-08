import "./../../App.css";
import React, { useState } from "react";
import "../../css/landingPage.css";
import Map from "./Map";
import { Polyline, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Map as LeafletMapData } from "leaflet";
import MapDataLayer from "../MapDataLayer";

const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };
const INITIAL_LAT_LON = [45.5051, -122.675] as LatLngExpression;
const INITIAL_ZOOM = 13;

// In production, talk to production. In development, prefer REACT_APP_API_URL variable
// (e.g. from command `REACT_APP_API_URL=localhost:8000 npm start`)
// Otherwise fall back to production server
const API_URL =
  process.env.NODE_ENV === "production" || !process.env.REACT_APP_API_URL
    ? "https://car-dependence-backend.herokuapp.com"
    : process.env.REACT_APP_API_URL;
if (process.env.NODE_ENV !== "production")
  console.info(`Using API endpoint ${API_URL}`);

function MapCom() {
  const [mapState, setMapState] = useState(null as LeafletMapData | null);

  return (
    <Map
      style={MAP_FILL_SCREEN_STYLE}
      center={INITIAL_LAT_LON}
      zoom={INITIAL_ZOOM}
      // sets up the useState hook so we can monitor Leaflet state externally
      whenCreated={setMapState}
    >
      {mapState && <MapDataLayer mapState={mapState} url={API_URL} />}
    </Map>
  );
}

/*
export default class MapCom extends Component{


// just a simple navigation component


    render(){

        

        
        return (
            <Map style={MAP_FILL_SCREEN_STYLE}>
        <Polyline positions={TEST_POLYLINE}>
          <Tooltip direction="bottom" offset={[0, 20]} permanent>
            Test tooltip
          </Tooltip>
        </Polyline>
      </Map>
            
        );

    }
}
*/

export default MapCom;
