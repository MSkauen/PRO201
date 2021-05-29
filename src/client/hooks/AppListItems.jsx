import React, {useEffect, useState} from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { useHistory, useParams } from "react-router";
import "../../shared/css/tmi.css";
import "../../shared/css/confirmation.css";
import { PARTS } from "../lib/images.jsx"
import { fetchJson } from "../lib/http";

export function AppListItems({item}) {
    const partsChanged = item.partsChanged
    const history = useHistory();
    const [timeLeft, setTimeLeft] = useState(9);

    const { data, error, loading, reload } = useLoading(() =>
        fetchJson("/api/profile", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    );

    useEffect(() => {
        if (!timeLeft) history.push("/home");

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [timeLeft]);


    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }
    if (loading || !data) {
        return <LoadingView />;
    }

    return (
    <>
      <h1>PARTS REPLACED FOR {item.serial}</h1>
      <div className="partsReplacedContainer">
          {
              partsChanged.map((id) => (
                  <div key={id} className="dot">
                      <img src={PARTS[id].image} alt=""/>
                      <div/>
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
        <h2 className="timerTag">You are being redirected in {timeLeft}'s</h2>
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
