import React, { useEffect, useState } from "react";
import { Map as LeafletMapData, LatLngBounds } from "leaflet";
import useBBox from "../../hooks/useBBox";
import BBoxData from "./BBoxApiData";

/*
  Tracks the map's bounding box, and triggers requests to the backend when it changes.
  It does this through the BBoxData component, just by adding one. That component
  talks to the backend directly.
*/
function MapApiDataLayer({
  url,
  mapState,
}: {
  url: string;
  mapState: LeafletMapData;
}) {
  // lat/lon locations representing the corners of the visible map, dynamically updating
  const bbox = useBBox(mapState);
  const [requestedData, setRequestedData] = useState([bbox] as LatLngBounds[]);
  console.log("requested data length", requestedData.length);

  useEffect(() => {
    // expect to update by default
    let shouldUpdate = true;
    // check if bbox is *entirely* contained within another single bbox
    // more could be done to make it smarter about when it requests data
    // but this alone helps a lot
    requestedData.forEach((bb) => {
      if (!bbox) throw new Error("bbox is null in requestedData update");
      if (bb.contains(bbox)) {
        console.log("bb contains bbox");
        shouldUpdate = false;
      }
    });
    if (!shouldUpdate) return;
    setRequestedData((rData) => [...rData, bbox] as LatLngBounds[]);
  });

  return (
    <>
      {requestedData.map((bb, i) => (
        <BBoxData url={url} bbox={bb} key={i} />
      ))}
    </>
  );
}

export default React.memo(MapApiDataLayer);
