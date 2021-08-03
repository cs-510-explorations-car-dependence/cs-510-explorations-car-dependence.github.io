import { useState, useCallback, useEffect } from "react";
import { Map } from "leaflet";

// returns a bounding box in the lat/lon format we're using instead of Leaflet's default,
// since it's also a valid Leaflet format and sends easier in the API request
function getBBox(map: Map) {
  if (!map) return null;
  return map.getBounds();
}

// gets a bounding box and dynamically updates it based on the currently visible map
function useBBox(map: Map) {
  const [bbox, setBBox] = useState(getBBox(map));

  const onMove = useCallback(() => {
    setBBox(getBBox(map));
  }, [map]);

  // adds the required event listeners for Leaflet to handle this properly
  useEffect(() => {
    map.on("moveend", onMove);
    map.on("zoomend", onMove);
    return () => {
      map.off("moveend", onMove);
      map.off("zoomend", onMove);
    };
  }, [map, onMove]);

  return bbox;
}

export default useBBox;
