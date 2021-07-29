import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>Contributors"';

type MapProps = {} & MapContainerProps;

function Map({ children, ...props }: MapProps) {
  return (
    <MapContainer
      preferCanvas // necessary for jest testing, SVG not well supported
      {...props}
    >
      {children}
      {/* Map Tiles */}
      <TileLayer url={URL} attribution={ATTRIBUTION} />
    </MapContainer>
  );
}

export default React.memo(Map);
