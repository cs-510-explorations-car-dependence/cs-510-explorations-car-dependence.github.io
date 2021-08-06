import React from "react";
import ApiServerResponse, { DataField } from "../ApiServerResponse";
import { GeoJSON } from "react-leaflet";
import {
  point,
  centroid,
  featureCollection,
  Feature,
  Point,
  Properties,
  isobands,
  FeatureCollection,
  Geometry,
} from "@turf/turf";
import { StyleFunction } from "leaflet";

const ISO_BAND_STYLE = {
  opacity: 1.0,
  fillOpacity: 0.4,
  weight: 1.0,
};

/*
  getGeoJSONPoints() {
    const { lats, lons } = this.coords;
    const pointsNested: Feature<Point, Properties>[][] = lats.map(
      (lat: number, latIndex: number) =>
        lons.map((lon: number, lonIndex: number) => {
          const point = turf.point([lon, lat]);
          const value = this.dataAtCoordinateIndex(latIndex, lonIndex);
          // console.log("VALUE", value);
          const centroid = turf.centroid(point, { value });
          // console.log("CENTROID", centroid);
          return centroid;
        })
    );
    const points = pointsNested.flat();
    const features = turf.featureCollection(points);
    return features;
  }

  getAsIsobands(colorScale: ColorScale) {
    const dataPoints = this.getGeoJSONPoints();
    let dataShapes: FeatureCollection<
      MultiPolygon | MultiLineString,
      Properties
    >;
    try {
      dataShapes = isobands(dataPoints, colorScale.breaks, {
        zProperty: "value",
        // TODO this is the problem with the orange I think...
        breaksProperties: colorScale.breaks.map((cbreak) => ({ cbreak })),
      });
      // console.log("DATA SHAPES", dataShapes);
    } catch (errorBands) {
      try {
        // console.log("ISOBANDS BREAKS", colorScale.breaks);
        dataShapes = isolines(dataPoints, colorScale.breaks, {
          zProperty: "value",
        });
        console.error("Failed to create data shapes: ", {
          errorBands: errorBands,
          dataPoints,
          data: this,
        });
      } catch (errorLines) {
        console.error("Failed to create data lines: ", {
          errorLines,
          dataPoints,
          data: this,
        });
        throw new Error("Failed to create map data visualization layer");
      }
    }
	*/

const createGeoJsonPoints = (
  apiStateData: ApiServerResponse,
  dataField: DataField
) => {
  const points: Feature<Point, Properties>[] = apiStateData
    .map((roadInfo) =>
      roadInfo.segments.map((segment) =>
        segment.shape.map(([lat, lon]) => {
          const value = segment[dataField];
          const pt = point([lon, lat], { value });
          // @ts-ignore
          return centroid(pt, { value });
        })
      )
    )
    .flat(2);
  return featureCollection(points);
};

const createIsoBands = (
  geoJsonPoints: FeatureCollection<Point, Properties>
) => {
  const breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bands = isobands(geoJsonPoints, breaks, {
    zProperty: "value",
    breaksProperties: breaks.map((cbreak) => ({ cbreak })),
  });

  // TODO why does TypeScript only like "any" here?
  const styleFn: StyleFunction<any> = (
    feature: Feature<any, any> | undefined
  ) => {
    if (!feature) return {};
    const rawValue = feature.properties!.cbreak;
    const value = Number(rawValue);
    const color = "green";
    return { color, fillColor: color, ...ISO_BAND_STYLE };
  };

  return {
    bands,
    styleFn,
  };
};

const createDataShapes = (
  apiStateData: ApiServerResponse,
  dataField: DataField
) => {
  const geoJsonPoints = createGeoJsonPoints(apiStateData, dataField);
  console.log(geoJsonPoints);
  return createIsoBands(geoJsonPoints);
};

function BBoxApiIsoBands({
  apiStateData,
  visDataField,
  determineSegmentColor,
}: {
  apiStateData: ApiServerResponse;
  visDataField: DataField;
  determineSegmentColor: (value: number) => string;
}) {
  const { bands, styleFn } = createDataShapes(apiStateData, visDataField);
  return <GeoJSON data={bands} style={styleFn} key={Date.now()} />;
}

export default BBoxApiIsoBands;
