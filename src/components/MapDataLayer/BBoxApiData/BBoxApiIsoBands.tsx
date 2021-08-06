import React from "react";
import ApiServerResponse, { DataField } from "../ApiServerResponse";
import { GeoJSON } from "react-leaflet";

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

const createGeoJsonPoints = (apiStateData: ApiServerResponse) => {};

/*
const createIsoBands(geoJsonPoints) {

}
*/

const createDataShapes = (apiStateData: ApiServerResponse) => {
  const geoJsonPoints = createGeoJsonPoints(apiStateData);
  // const isoBands = createIsoBands(geoJsonPoints);
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
  const dataShapes = createDataShapes(apiStateData);
  // return <GeoJSON data={dataShapes} style={style} key={Date.now()} />;
  return null;
}

export default BBoxApiIsoBands;
