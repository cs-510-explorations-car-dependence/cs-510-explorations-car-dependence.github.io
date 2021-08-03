import React, { useEffect, useState } from "react";
import { Map as LeafletMapData, LatLngBounds } from "leaflet";
import useBBox from "../../hooks/useBBox";
import BBoxApiData from "./BBoxApiData";

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

  useEffect(() => {
    // expect to update by default
    let shouldUpdate = true;
    // check if bbox is *entirely* contained within another single bbox
    // TODO
    // a lot more could be done to make it smarter about knowing when it has all
    // required data on screen, or requesting only sections of a screen
    // but this alone helps a lot
    requestedData.forEach((bb) => {
      if (!bbox) throw new Error("bbox is null in requestedData update");
      if (bb.contains(bbox)) shouldUpdate = false;
    });

    // all expected data is already displayed on the map, no need to request more
    if (!shouldUpdate) return;

    setRequestedData((rData) => [...rData, bbox] as LatLngBounds[]);
  }, [bbox]);

  const removeBBoxData = (bb: LatLngBounds) => {
    var bboxIndex = requestedData.indexOf(bb);
    setRequestedData((rData) => [...rData].splice(bboxIndex, 1));
  };

  return (
    <>
      {requestedData.map((bb, i) => (
        <BBoxApiData
          url={url}
          // view={bbox}
          dataBBox={bb}
          key={i}
          remove={() => removeBBoxData(bb)}
        />
      ))}
    </>
  );
}

export default React.memo(MapApiDataLayer);
