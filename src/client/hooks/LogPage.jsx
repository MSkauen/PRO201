import React, { useState } from "react";
//import { Battery } from "../../shared/img/parts/new/";
import "../../shared/css/stylesheet.css";
import {useLoading} from "../lib/useLoading";
import {useParams} from "react-router";
import {ErrorView} from "../components/ErrorView";
import {LoadingView} from "../components/LoadingView";

export function LogPage({ item }) {
  const [user, setUser] = useState("");
  const [itemSerial, setItemSerial] = useState(item.itemSerial);

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {});
    const json = await res.json();
    let user = json.username;

    await fetch(`/api/item/${itemSerial}`, {
      method: "POST",
      body: JSON.stringify({ user, itemSerial }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
      <div className="mainContainer">
          <div id="logContainer" align="center">
              <div className="logHeader">
                  <img src="../../shared/img/parts.png" alt=""/>
                      <div className="logDetails">
                          <h2 id="serial">765AJGL5965IO</h2>
                          <h2>SELECT PART USED FOR REPAIR</h2>
                      </div>
              </div>
              <div className="partsContainer">
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/battery.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/solar_panel.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_batteryBox-PCBA_screws.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_cable2.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_dongle.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_dongle_WBatterypack.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_power_switch_cover.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_power_switch_cover_2.0-smart.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_power_switch_cover_rev_E-D.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_pcb.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_solarPower-USB_plug_cover.png" alt=""/>
                          <div>
                          </div>
                  </div>
                  <div tabIndex="0" className="dot" data-value="0">
                      <img src="../../shared/img/parts/new/sunBell_usb_rev_D_2.6.png" alt=""/>
                          <div>
                          </div>
                  </div>
              </div>
              <form onSubmit="/tmi" method="get">
                  <button type="submit" name="submitButton" id="loginButton"/>
              </form>
          </div>
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