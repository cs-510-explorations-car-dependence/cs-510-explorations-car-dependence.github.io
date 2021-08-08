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
        {allValues.map((field, i) => {
          const buttonClassName =
            "field-control-button " +
            (field === value ? "field-control-button-selected" : "");
          return (
            <li className="field-control-list-member" key={i}>
              <button
                className={buttonClassName}
                onClick={() => setValue(field)}
              >
                {field}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListMenu;
