import React from "react";
import { interpolateViridis } from "d3";
import { useFetch, IfPending, IfRejected, AsyncState } from "react-async";
import { LatLngBounds } from "leaflet";
import { Rectangle } from "react-leaflet";
import ApiServerResponse, { DataField } from "../ApiServerResponse";
import BBoxApiPolylines from "./BBoxApiPolylines";
import BBoxApiIsoBands from "./BBoxApiIsoBands";

// numbers outside of this range will share the min/max color
const VIS_MIN = 0;
const VIS_MAX = 1;

// Not binding, just a string, named only to show taht it's intended to be a color.
type ColorString = string;

const REQUEST_HEADERS = {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
  },
} as RequestInit;

const valueToViridisRange = (
  value: number,
  min: number,
  max: number
): ColorString => {
  const lerpedValue = (value - min) / (max - min);
  return interpolateViridis(lerpedValue);
};

type BBoxApiDataProps = {
  url: string;
  dataField: DataField;
  dataBBox: LatLngBounds;
  remove: () => void;
  zoom: number;
};

function BBoxApiData({
  url,
  dataField,
  dataBBox,
  remove,
  zoom,
}: BBoxApiDataProps) {
  console.log("loading bbox", { dataField });
  const request = `${url}/api/v1/bbox?ul=${dataBBox.getNorth()},${dataBBox.getWest()}&br=${dataBBox.getSouth()},${dataBBox.getEast()}`;
  // Initialize backend communication
  const apiState: AsyncState<ApiServerResponse> = useFetch(
    request,
    REQUEST_HEADERS
  );

  const valueToColor = (value: number) =>
    valueToViridisRange(value, VIS_MIN, VIS_MAX);

  const renderLines = true;
  const renderShapes = true;

  // Check if should be removed
  // if (apiState.isRejected) remove();

  return (
    <>
      <IfPending state={apiState}>
        <Rectangle bounds={dataBBox} fillColor={"grey"} fillOpacity={0.5} />
      </IfPending>
      <IfRejected state={apiState}>Error Message</IfRejected>
      {apiState.isFulfilled && apiState.data && (
        <>
          {renderLines && (
            <BBoxApiPolylines
              apiStateData={apiState.data}
              visDataField={dataField}
              determineSegmentColor={valueToColor}
            />
          )}
          {renderShapes && (
            <BBoxApiIsoBands
              apiStateData={apiState.data}
              visDataField={dataField}
              determineSegmentColor={valueToColor}
            />
          )}
        </>
      )}
    </>
  );
}

const propsChanged = (prev: BBoxApiDataProps, next: BBoxApiDataProps) =>
  prev.dataBBox.equals(next.dataBBox) && prev.dataField === next.dataField;

export default React.memo(BBoxApiData, propsChanged);
