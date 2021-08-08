import React from "react";
import { useFetch, IfPending, IfRejected, AsyncState } from "react-async";
import { LatLngBounds } from "leaflet";
import { Rectangle } from "react-leaflet";
import ApiServerResponse, { DataField } from "../ApiServerResponse";
import BBoxApiPolylines from "./BBoxApiPolylines";
import BBoxApiIsoBands from "./BBoxApiIsoBands";

const REQUEST_HEADERS = {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
  },
} as RequestInit;

type BBoxApiDataProps = {
  url: string;
  dataField: DataField;
  dataBBox: LatLngBounds;
  // remove: () => void;
  zoom: number;
  valueToColorFn: (value: number) => string;
};

function BBoxApiData({
  url,
  dataField,
  dataBBox,
  // remove,
  zoom,
  valueToColorFn,
}: BBoxApiDataProps) {
  // console.log("loading bbox", { dataField });
  const request = `${url}/api/v1/bbox?ul=${dataBBox.getNorth()},${dataBBox.getWest()}&br=${dataBBox.getSouth()},${dataBBox.getEast()}`;
  // Initialize backend communication
  const apiState: AsyncState<ApiServerResponse> = useFetch(
    request,
    REQUEST_HEADERS
  );

  const renderLines = true;
  // const renderShapes = true;
  const renderShapes = false;

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
              determineSegmentColor={valueToColorFn}
            />
          )}
          {renderShapes && (
            <BBoxApiIsoBands
              apiStateData={apiState.data}
              visDataField={dataField}
              determineSegmentColor={valueToColorFn}
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
