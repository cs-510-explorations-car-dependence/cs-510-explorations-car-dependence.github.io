import React, { useEffect } from "react";
import { LatLngExpression, Map as LeafletMapData } from "leaflet";
import { Polyline, Tooltip } from "react-leaflet";
import useBBox from "../hooks/useBBox";
import {
  useFetch,
  IfPending,
  IfFulfilled,
  IfRejected,
  AsyncState,
} from "react-async";

type ApiServerResponse = {
  route: LatLngExpression[];
} & Response;

function MapApiDataLayer({
  url,
  mapState,
}: {
  url: string;
  mapState: LeafletMapData;
}) {
  // lat/lon locations representing the corners of the visible map, dynamically updating
  const bbox = useBBox(mapState);

  // Initialize backend communication
  const apiState: AsyncState<ApiServerResponse> = useFetch(url, {
    method: "POST",
    headers: { accept: "application/json" },
  });

  // This is for React error handling
  // React thinks useEffect is missing a dependency unless we watch this
  // Watching it as apiState.run doesn't make React happy either, so we just
  // pull it out here.
  const { run: requestUpdateApiState } = apiState;

  // When bounding box of visible map changes, request new data
  useEffect(() => {
    requestUpdateApiState({ body: JSON.stringify({ bbox }) });
  }, [bbox, requestUpdateApiState]);

  return (
    <>
      <IfPending state={apiState}>Loading...</IfPending>
      <IfRejected state={apiState}>Error Message</IfRejected>
      <IfFulfilled state={apiState}>
        {false && ( // TODO remove this so these elements render
          // TODO parse API response correctly
          <Polyline positions={apiState.data?.route!}>
            <Tooltip direction="bottom" offset={[0, 20]} permanent />
          </Polyline>
        )}
      </IfFulfilled>
    </>
  );
}

export default MapApiDataLayer;
