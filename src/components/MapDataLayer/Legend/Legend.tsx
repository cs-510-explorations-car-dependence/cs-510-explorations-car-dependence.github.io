import { color } from "d3-color";
import React from "react";
import { isWhiteSpaceLike } from "typescript";
import "./styles.css";

const printValue = (value: number) => {
  if (value === 0) return "0";
  if (value < 1) return value.toFixed(2);
  if (value < 100) return value.toFixed(1);
  if (value < 1000) return value.toFixed(0);
  if (value < 1000000) return Math.floor(value / 1000) + "k";
};

function Legend({
  min,
  max,
  steps,
  valueToColorFn,
}: {
  min: number;
  max: number;
  steps: number;
  valueToColorFn: (value: number) => string;
}) {
  // const rectWidth = Math.ceil(width / steps);
  // TODO is this right? Works for min = 0 for sure, that might be all we need
  const perRectValue = (max - min) / steps;
  const colorRects = [];
  for (let i = 0; i <= steps; ++i) {
    const rectValue = perRectValue * i;
    colorRects.push(valueToColorFn(rectValue));
  }
  const rectWidth = 100 / (steps + 1);
  console.log(colorRects);
  return (
    <div className="legend-bg">
      {colorRects.map((rectColor, i) => (
        <div
          style={{
            position: "absolute",
            left: `${rectWidth * i}%`,
            width: `${rectWidth}%`,
            background: rectColor,
            top: 0,
            bottom: "50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "5px",
              right: "5px",
              textAlign: "center",
              background: "white",
              color: "black",
              fontSize: "12px",
            }}
          >
            {printValue(perRectValue * i)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
