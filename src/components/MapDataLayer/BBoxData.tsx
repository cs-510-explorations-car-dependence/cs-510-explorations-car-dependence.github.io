import React from "react";
import { interpolateViridis } from "d3";
import { BBox } from "../../hooks/useBBox";
import { useFetch, IfPending, IfRejected, AsyncState } from "react-async";
import { Polyline } from "react-leaflet";
import { Tooltip } from "react-leaflet";

// Not binding, just a string, named to show intent.

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

function BBoxData({ url, bbox }: { url: string; bbox: BBox }) {
  const request = `${url}/api/v1/bbox/?ul=${bbox[0].join(
    ","
  )}&br=${bbox[1].join(",")}`;
  // Initialize backend communication
  const apiState: AsyncState<ApiServerResponse> = useFetch(
    // `${url}/api/v1/bbox/?ul=45.464303,-122.718788&br=45.588414,-122.478462`,
    request,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    }
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
              <Polyline
                positions={segment.shape}
                key={i * apiState.data.length + j}
                color={determineSegmentColor(segment["CO2"], 0, 4)}
              >
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
