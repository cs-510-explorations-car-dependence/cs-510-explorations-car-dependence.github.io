import { useState, useCallback, useEffect } from "react";
import { Map } from "leaflet";

function useZoom(map: Map) {
  const [zoom, setZoom] = useState(map.getZoom());

  const onZoom = useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on("zoom", onZoom);
    return () => {
      map.off("zoom", onZoom);
    };
  }, [map, onZoom]);

  return zoom;
}

export default useZoom;
