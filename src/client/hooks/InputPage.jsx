import React, { useState } from "react";
import { InputField } from "../components/InputField";
import Barcode from "url:../../shared/img/barcode.png";
import { useHistory } from "react-router";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { fetchJson } from "../lib/http";

export function InputPage() {
    const [serial, setSerial] = useState("");
    const history = useHistory();

       const getLocation = async() => {
        let location = {}
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                location = {location: {lat: position.coords.latitude, lng: position.coords.longitude}}
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }
        return location
    };

    const {data, error, loading, reload} = useLoading(() =>
        fetchJson("/api/profile", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json",
            },
        }));


    if (error) {
        return <ErrorView error={error} reload={reload}/>;
    }
    if (loading || !data) {
        return <LoadingView/>;
    }

    async function submit(e) {
        e.preventDefault();

        const location = getLocation();

            await fetch("/api/item", {
                method: "POST",
                body: JSON.stringify({
                    user: data.username,
                    location: location,
                    partsChanged: [],
                    serial: serial
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        history.push(`/item/${serial}/edit`)
    }


  return (
        <div id="inputContainer" align="center">
          <br/>
            <img id="barcode" src={Barcode} alt=""/>
              <h1 id="input-desc">TYPE UNIT NUMBER</h1>

              <form className="inputForm" onSubmit={submit}>
                <InputField id="serial"
                       className="serial"
                       type="text"
                       placeholder="765AJGL5965IO"
                       maxLength="12"
                       required
                        onChangeValue={setSerial}/>
                  <button type="submit" name="submitButton" id="loginButton"/>
              </form>
        </div>
  );
}
