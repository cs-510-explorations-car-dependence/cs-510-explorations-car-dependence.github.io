import React, { useEffect, useState } from "react";
import { Map as LeafletMapData, LatLngBounds } from "leaflet";
import useMapBBox from "../../hooks/useMapBBox";
import BBoxApiData from "./BBoxApiData/BBoxApiData";
import useMapZoom from "../../hooks/useMapZoom";
import { useDataFieldSelection } from "./ApiServerResponse";
import VisibleFieldControl from "./VisibleFieldControl";

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
  const bbox = useMapBBox(mapState);
  const zoom = useMapZoom(mapState);
  const { currentField, setField, fields } = useDataFieldSelection();

  const [requestedData, setRequestedData] = useState([bbox] as LatLngBounds[]);

  useEffect(() => {
    if (zoom < 13) return;
    /*
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
    */
    setRequestedData((rData) => [bbox] as LatLngBounds[]);
  }, [bbox, zoom]);

  const removeBBoxData = (bb: LatLngBounds) => {
    var bboxIndex = requestedData.indexOf(bb);
    setRequestedData((rData) => [...rData].splice(bboxIndex, 1));
  };

  return (
    <>
      <VisibleFieldControl
        value={currentField}
        setValue={setField}
        allValues={fields}
      />
      {requestedData.map((bb, i) =>
        bb ? (
          <BBoxApiData
            url={url}
            zoom={zoom}
            dataBBox={bb}
            dataField={currentField}
            key={i}
            // TODO this is a good idea but when the backend can't be reached it crashes hard
            remove={() => removeBBoxData(bb)}
          />
        ) : null
      )}
    </>
  );
}

export default React.memo(MapApiDataLayer);
