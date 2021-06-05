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
    const itemSerial = item.serial
    const itemParts = PARTS
    const history = useHistory()

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
                  {
                      itemParts.map((id) => (
                          <div key={id.id}>
                              <h5 id="partNumber" className="main-h5">{id.id+1}</h5>
                              <div id={id.id} className="dot" data-value="0" onClick={check}>
                                  <img src={id.image} alt=""/>
                                  <span>
                              </span>
                              </div>
                          </div>
                      ))}
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
    const checkboxes = Array.from(document.getElementsByClassName('dot'));
    let selections = []

    for(let i = 0; i <= checkboxes.length - 1; i++) {
        if(checkboxes[i].getAttribute("data-value") === "1") {
            let id = checkboxes[i].id
            selections.push(id)
        }
    }
    return selections
}
