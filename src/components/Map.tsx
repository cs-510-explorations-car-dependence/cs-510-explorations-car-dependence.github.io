import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>Contributors"';
const PORTLAND_LAT_LON = [45.5051, -122.675] as LatLngExpression;

type MapProps = {
  children?: React.ReactNode;
};

function Map({ children = null }: MapProps) {
  return (
    <MapContainer
      style={{
        width: "100vw",
        height: "100vh",
      }}
      center={PORTLAND_LAT_LON}
      zoom={13}
    >
      {children}
      {/* Map Tiles */}
      <TileLayer url={URL} attribution={ATTRIBUTION} />
    </MapContainer>
  );
}

export default Map;
