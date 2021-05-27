import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import {useParams} from "react-router";
import IMAGES from "../lib/images.jsx"

export function AppListItems({item}) {
    const partsChanged = item.partsChanged

  return (
    <>
      <h1>PARTS REPLACED FOR {item.serial.toString()}</h1>
      <div className="partsReplacedContainer">
          {
              partsChanged.map((id) => (
                  <div id={id} className="dot" data-value="0">
                      <img src={IMAGES[id].image} alt=""/>
                      <div></div>
                  </div>
              ))}
      </div>

      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"/>
          <span className="icon-line line-long"/>
          <div className="icon-circle"/>
          <div className="icon-fix"/>
        </div>
      </div>

      <h1>SUCCESS!</h1>
      <h2 className="timerTag"/>
    </>
  );
}
export function GetItem({ itemApi }) {
    const { id } = useParams()
    const { data: item, loading, error, reload } = useLoading(
        async () => await itemApi.getItem(id),
        [id]
    );
    if (error) {
        return <ErrorView error={error} reload={reload()} />;
    }

    if (loading || !item) {
        return <LoadingView />;
    }

    return <AppListItems item={item} />;
}
