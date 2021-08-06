import { useState, useCallback, useEffect } from "react";
import { Map } from "leaflet";

function useZoom(map: Map) {
  const [zoom, setZoom] = useState(map.getZoom());

  const onZoom = useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on("zoomend", onZoom);
    return () => {
      map.off("zoomend", onZoom);
    };
  }, [map, onZoom]);

  return zoom;
}

export default useZoom;
