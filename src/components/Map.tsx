import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>Contributors"';
const PORTLAND_LAT_LON = [45.5051, -122.675] as LatLngExpression;

type MapProps = {} & MapContainerProps;

function Map({ children, ...props }: MapProps) {
  return (
    <MapContainer
      preferCanvas // necessary for jest testing, SVG not well supported
      center={PORTLAND_LAT_LON}
      zoom={13}
      {...props}
    >
      {children}
      {/* Map Tiles */}
      <TileLayer url={URL} attribution={ATTRIBUTION} />
    </MapContainer>
  );
}

export default Map;
