import React, { useEffect, useState } from "react";
import { LatLngExpression, Map as LeafletMapData } from "leaflet";
import { Polyline, Tooltip, Popup } from "react-leaflet";
import useBBox, { BBox } from "../../hooks/useBBox";
import { useFetch, IfPending, IfRejected, AsyncState } from "react-async";
import { interpolateViridis } from "d3";
import BBoxData from "./BBoxData";

/*
type ColorString = string;

const determineSegmentColor = (
  value: number,
  min: number,
  max: number
): ColorString => {
  const lerpedValue = (value - min) / (max - min);
  return interpolateViridis(lerpedValue);
};

type SegmentInfo = {
  CO2: number;
  NOx: number;
  PM10: number;
  "PM2.5": number;
  VOC: number;
  shape: [number, number][];
};

type RoadInfo = {
  road: string;
  segments: SegmentInfo[];
};
type ApiServerResponse = RoadInfo[];
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
  const [requestedData, setRequestedData] = useState([bbox] as BBox[]);

  useEffect(() => {
    // saves old data, may be useful with some logic to make it smarter
    setRequestedData((rData) => [...rData, bbox] as BBox[]);
    // requests new data every time the map moves, feels pretty bad
    // setRequestedData([bbox];
  }, [bbox]);

  return (
    <>
      {requestedData.map((bb, i) => (
        <BBoxData url={url} bbox={bb} key={i} />
      ))}
    </>
  );
}

export default React.memo(MapApiDataLayer);
