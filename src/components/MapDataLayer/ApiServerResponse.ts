import { useState } from "react";

export enum DataField {
  CO = "CO",
  CO2 = "CO2",
  NOx = "NOx",
  PM2P5 = "PM2.5",
}

export const useDataFieldSelection = () => {
  const [currentField, setField] = useState(DataField.CO2);
  const fields = [
    DataField.CO2,
    DataField.CO,
    DataField.NOx,
    DataField.PM2P5,
  ];
  return {
    currentField,
    setField,
    fields,
  };
};

export const dataFieldRanges = {
  [DataField.CO]: [0, 811],
  [DataField.CO2]: [0, 80000],
  [DataField.NOx]: [0, 37.5],
  [DataField.PM2P5]: [0, 1.38],
};

// Info corresponding to a road segment, which can have 1 or more line segments
// defined in "shape", but only one set of emissions data.
export type SegmentInfo = {
  [DataField.CO2]: number;
  [DataField.CO]: number;
  [DataField.NOx]: number;
  [DataField.PM2P5]: number;
  shape: [number, number][];
};

// Info about a road - the "road" name, and the road's segments
export type RoadInfo = {
  road: string;
  segments: SegmentInfo[];
};

// Expected type of server response.
type ApiServerResponse = RoadInfo[];

export default ApiServerResponse;
