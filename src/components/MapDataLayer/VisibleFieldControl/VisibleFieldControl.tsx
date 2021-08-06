import React from "react";
import "./styles.css";

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
    <div className="field-control-menu">
      <ul className="field-control-list">
        {allValues.map((f, i) => (
          <li className="field-control-list-member" key={i}>
            <button
              // style={f === value ? selectedStyle : buttonStyle}
              className={
                "field-control-button " +
                (f === value ? "field-control-button-selected" : "")
              }
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
