import React from "react";
import loadingIcon from "url:../../shared/img/Spinner.svg";

export function LoadingView() {
  return <div>
    <img src={loadingIcon} alt="React Logo" />
  </div>;
}
