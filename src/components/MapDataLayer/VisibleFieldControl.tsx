import React from "react";

const menuStyle = {
  position: "absolute",
  zIndex: 1000,
} as React.CSSProperties;

const buttonStyle = {};

const selectedStyle = {
  background: "red",
  ...buttonStyle,
};

function ListMenu<T>({
  value,
  setValue,
  allValues,
}: {
  value: T;
  setValue: (value: T) => void;
  allValues: T[];
}) {
  return (
    <div style={menuStyle}>
      <ul>
        {allValues.map((f) => (
          <li>
            <button
              style={f === value ? selectedStyle : buttonStyle}
              onClick={() => setValue(f)}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListMenu;
