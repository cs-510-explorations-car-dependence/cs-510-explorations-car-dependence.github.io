import { useState, useCallback, useEffect } from "react";
import { Map, LatLngBounds } from "leaflet";

function getBBox(map: Map) {
  if (!map) return null;
  const bounds = map.getBounds();
  return [
    [bounds.getNorth(), bounds.getWest()],
    [bounds.getSouth(), bounds.getEast()],
  ];
}

function useBBox(map: Map) {
  const [bbox, setBBox] = useState(getBBox(map));

  const onMove = useCallback(() => {
    setBBox(getBBox(map));
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return bbox;
}

export default useBBox;
