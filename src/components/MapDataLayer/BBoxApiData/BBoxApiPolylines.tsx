import { Polyline, Tooltip } from "react-leaflet";
import React from "react";
import ApiServerResponse, {
  DataField,
  SegmentInfo,
} from "../ApiServerResponse";

function BBoxApiPolylines({
  apiStateData,
  visDataField,
  determineSegmentColor,
}: {
  apiStateData: ApiServerResponse;
  visDataField: DataField;
  determineSegmentColor: (value: number) => string;
}) {
  console.log("drawing polylines", visDataField);
  return (
    <>
      {apiStateData.map((roadData, i) =>
        roadData.segments
          .map((segment, j) => {
            return (
              /* Road line segments */
              <Polyline
                positions={segment.shape}
                key={i * apiStateData.length + j}
                color={determineSegmentColor(segment[visDataField])}
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
            );
          })
          .flat()
      )}
    </>
  );
}

export default BBoxApiPolylines;
