import { useState, useCallback, useEffect } from "react";
import { Map } from "leaflet";

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
