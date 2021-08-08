import { useState, useCallback, useEffect } from "react";
import { Map } from "leaflet";

// gets a bounding box and dynamically updates it based on the currently visible map
function useBBox(map: Map) {
  const [bbox, setBBox] = useState(map.getBounds());

  const onMove = useCallback(() => {
    setBBox(map.getBounds());
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
