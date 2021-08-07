import React from "react";
import "./styles.css";

function WarningToast({ msg }: { msg: string }) {
  return <div className="warning-toast ">{msg}</div>;
}

export default WarningToast;
