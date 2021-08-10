import { useState, useCallback, useEffect } from "react";
import { LatLng, Map } from "leaflet";

const asValidLon = (lon: number) => (((lon % 360) + 540) % 360) - 180;

// gets a bounding box and dynamically updates it based on the currently visible map
function useBBox(map: Map) {
  const [bbox, setBBox] = useState(map.getBounds());

  const onMove = useCallback(() => {
    const center = map.getCenter();
    if (
      center.lat >= -90 &&
      center.lat <= 90 &&
      center.lng >= -180 &&
      center.lng <= 180
    ) {
      setBBox(map.getBounds());
    } else {
      const validLat = center.lat;
      const validLon = asValidLon(center.lng);
      const newCenter = new LatLng(validLat, validLon);
      map.setView(newCenter, undefined, { animate: false });
    }
  }, [map]);

  const onZoom = useCallback(() => {
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
  }, [map, onMove, onZoom]);

  return bbox;
}

export default useBBox;
