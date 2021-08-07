import { useState } from "react";

export enum DataField {
  CO2 = "CO2",
  NOx = "NOx",
  PM10 = "PM10",
  PM2P5 = "PM2.5",
  VOC = "VOC",
}

export const useDataFieldSelection = () => {
  const [currentField, setField] = useState(DataField.CO2);
  const fields = [
    DataField.CO2,
    DataField.NOx,
    DataField.PM10,
    DataField.PM2P5,
    DataField.VOC,
  ];
  return {
    currentField,
    setField,
    fields,
  };
};

export const dataFieldRanges = {
  [DataField.CO2]: [0, 343270],
  [DataField.NOx]: [0, 163],
  [DataField.PM10]: [0, 10], // TODO
  [DataField.PM2P5]: [0, 6],
  [DataField.VOC]: [0, 10], // TODO
};

// Info corresponding to a road segment, which can have 1 or more line segments
// defined in "shape", but only one set of emissions data.
export type SegmentInfo = {
  [DataField.CO2]: number;
  [DataField.NOx]: number;
  [DataField.PM10]: number;
  [DataField.PM2P5]: number;
  [DataField.VOC]: number;
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
