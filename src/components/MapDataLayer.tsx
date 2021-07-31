import React, { useEffect, useState } from "react";
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
  const bbox = useBBox(mapState);
  const apiState: AsyncState<ApiServerResponse> = useFetch(url, {
    method: "POST",
    headers: { accept: "application/json" },
  });

  useEffect(() => {
    apiState.run({ body: JSON.stringify({ bbox }) });
  }, [bbox]);

  return (
    <>
      <IfPending state={apiState}>Loading...</IfPending>
      <IfRejected state={apiState}>Error Message</IfRejected>
      <IfFulfilled state={apiState}>
        {false && (
          <Polyline positions={apiState.data?.route!}>
            <Tooltip direction="bottom" offset={[0, 20]} permanent />
          </Polyline>
        )}
      </IfFulfilled>
    </>
  );
}

export default MapApiDataLayer;
