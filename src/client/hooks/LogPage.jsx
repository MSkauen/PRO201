import "../../shared/css/stylesheet.css";
import { useLoading } from "../lib/useLoading";
import { useHistory, useParams } from "react-router";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { check } from "../lib/checkbox";
import { fetchJson } from "../lib/http";
import { MISC, PARTS } from "../lib/images.jsx"
import "../../shared/css/main.css";
import React from "react";

export function LogPage({ item }) {
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

    await fetch(`/api/item/${itemSerial}`, {
      method: "PUT",
      body: JSON.stringify({ user, itemSerial, selections }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      history.push(`/item/${itemSerial}/success`)
  }

  return (
          <div id="logContainer" align="center">
              <div className="logHeader">
                  <img src={MISC[0].image} alt=""/>
                      <div className="logDetails">
                          <h2 id="serial">{itemSerial}</h2>
                          <h2>SELECT PART USED FOR REPAIR</h2>
                      </div>
              </div>
              <div className="partsContainer">
                  <div id={PARTS[0].id} className="dot" data-value="0" onClick={check}>
                      <h5 id="partNumber" className="main-h5">{PARTS[0].id+1}</h5>
                      <img src={PARTS[0].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[1].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[1].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[2].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[2].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[3].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[3].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[4].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[4].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[5].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[5].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[6].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[6].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[7].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[7].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[8].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[8].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[9].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[9].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[10].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[10].image} alt=""/>
                          <div>
                          </div>
                  </div>
                  <div id={PARTS[11].id} className="dot" data-value="0" onClick={check}>
                      <img src={PARTS[11].image} alt=""/>
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
    return selections
}
