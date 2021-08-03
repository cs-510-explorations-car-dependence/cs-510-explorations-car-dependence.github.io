import React from "react";
import { interpolateViridis } from "d3";
import { useFetch, IfPending, IfRejected, AsyncState } from "react-async";
import { Polyline } from "react-leaflet";
import { Tooltip } from "react-leaflet";
import { LatLngBounds } from "leaflet";

const VIS_DATA_FIELD = "CO2";
// numbers outside of this range will share the max/min color
const VIS_MIN = 0;
const VIS_MAX = 4;

// Not binding, just a string, named only to show taht it's intended to be a color.
type ColorString = string;

const requestHeaders = {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
  },
} as RequestInit;

const determineSegmentColor = (
  value: number,
  min: number,
  max: number
): ColorString => {
  const lerpedValue = (value - min) / (max - min);
  return interpolateViridis(lerpedValue);
};

// Info corresponding to a road segment, which can have 1 or more line segments
// defined in "shape", but only one set of emissions data.
type SegmentInfo = {
  CO2: number;
  NOx: number;
  PM10: number;
  "PM2.5": number;
  VOC: number;
  shape: [number, number][];
};

// Info about a road - the "road" name, and the road's segments
type RoadInfo = {
  road: string;
  segments: SegmentInfo[];
};

// Expected type of server response.
type ApiServerResponse = RoadInfo[];

function BBoxData({ url, bbox }: { url: string; bbox: LatLngBounds }) {
  const request = `${url}/api/v1/bbox/?ul=${bbox.getNorth()},${bbox.getWest()}&br=${bbox.getSouth()},${bbox.getEast()}`;
  // Initialize backend communication
  const apiState: AsyncState<ApiServerResponse> = useFetch(
    request,
    requestHeaders
  );

  return (
    <>
      <IfPending state={apiState}>Loading...</IfPending>
      <IfRejected state={apiState}>Error Message</IfRejected>
      {apiState.isFulfilled &&
        apiState.data &&
        apiState.data.map((roadData, i) =>
          roadData.segments
            .map((segment, j) => (
              /* Road line segments */
              <Polyline
                positions={segment.shape}
                key={i * apiState.data.length + j}
                color={determineSegmentColor(segment[VIS_DATA_FIELD], 0, 4)}
              >
                {/* Mouseover tooltip data*/}
                <Tooltip>
                  <h3 className="road-name">{roadData.road}</h3>
                  {Object.keys(segment).map((dataField, i) => {
                    if (dataField === "shape") return null;
                    return (
                      <div key={i}>
                        <h4 className="field-name">{dataField}</h4>
                        {segment[dataField as keyof SegmentInfo]}
                      </div>
                    );
                  })}
                </Tooltip>
              </Polyline>
            ))
            .flat()
        )}
    </>
  );
}

export default React.memo(BBoxData);