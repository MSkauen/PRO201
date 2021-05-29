import React, { useState } from "react";
import { InputField } from "../components/InputField";
import Barcode from "url:../../shared/img/barcode.png";
import { useHistory } from "react-router";
import {ErrorView} from "../components/ErrorView";
import {LoadingView} from "../components/LoadingView";

export function InputPage() {
  const [serial, setSerial] = useState("");
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {});
    const json = await res.json();
    let user = json.username;

    await fetch("/api/item", {
      method: "POST",
      body: JSON.stringify({ user, serial }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    history.push(`/item/${serial}/edit`)
  }
  /*
  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }*/

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
