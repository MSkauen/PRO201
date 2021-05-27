import React, { useState } from "react";
import "../../shared/css/stylesheet.css";
import {useLoading} from "../lib/useLoading";
import {useHistory, useParams} from "react-router";
import {ErrorView} from "../components/ErrorView";
import {LoadingView} from "../components/LoadingView";
import {check} from "../lib/checkbox";
import {fetchJson} from "../lib/http";
import IMAGES from "../lib/images.jsx"

export function LogPage({ item }) {
  const [user, setUser] = useState("");
  const itemSerial = item.serial;
    const history = useHistory();

    const { data, error, loading, reload } = useLoading(() =>
        fetchJson("/api/profile", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    );

    if(data){
        if(item.user !== data.username) {
            let newError = Error()
            newError.status = 401
            console.log("FALSE")
            return <ErrorView error={newError} reload={reload} />;
        } else {
            console.log("CORRECT")
            console.log("LOGPAGE"+item.serial)
        }
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }
    if (loading || !data) {
        return <LoadingView />;
    }


  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {});
    const json = await res.json();
    let user = json.username;
    let selections = storeSelections();
      console.log(selections)
    if(!selections){
        console.log("BAD")
    }

    await fetch(`/api/item/${itemSerial}`, {
      method: "PUT",
      body: JSON.stringify({ user, itemSerial, selections }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      history.push(`/item/${itemSerial}`)
  }

  return (
          <div id="logContainer" align="center">
              <div className="logHeader">
                  <img src={IMAGES[0].Parts} alt=""/>
                      <div className="logDetails">
                          <h2 id="serial">{itemSerial}</h2>
                          <h2>SELECT PART USED FOR REPAIR</h2>
                      </div>
              </div>
              <div className="partsContainer">
                  <div id={IMAGES[1].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[1].Battery} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[2].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[2].SolarPanel}alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[3].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[3].SunBellPCBAScrews}alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[4].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[4].SunBellCable}alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[5].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[5].SunBellDongle}alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[6].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[6].SunBellDongleWBattery}alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[7].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[7].SunBellPcb} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[8].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[8].SunBellPowerSwitchCover} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[9].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[9].SunBellPowerSwitchCoverSmart} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[10].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[10].SunBellPowerSwitchCoverRevED} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[11].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[11].SunBellUSBCover} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={IMAGES[12].id} className="dot" data-value="0" onClick={check}>
                      <img src={IMAGES[12].SunBellUSBCoverRevD} alt=""/>
                          <div>
                          </div>
                  </div>
              </div>
              <form onSubmit={submit} method="get">
                  <button type="submit" name="submitButton" id="loginButton"/>
              </form>
          </div>
  );
}

export function EditItem({ itemApi }) {
    const { id } = useParams();
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

    return <LogPage item={item} />;
}

function storeSelections() {
    let checkboxes
    let selections = []
    checkboxes = document.getElementsByClassName("dot")

    for(let i = 0; i <= checkboxes.length - 1; i++) {
        if(checkboxes[i].getAttribute("data-value") === "1") {
            let id = checkboxes[i].id
            selections.push(id)
        }
    }
    console.log(selections)
    return selections
}
