import React from "react";
import { SPINNER } from "../lib/images.jsx"

export function LoadingView() {
  return <div>
    <img src={SPINNER.image} alt="React Logo" />
  </div>;
}
