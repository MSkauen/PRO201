import { InputField } from "../components/InputField";
import { closeModal } from "../components/ModalView";
import React, {useEffect, useState} from "react";
import { postJson } from "../lib/http";
import { useHistory } from "react-router";
import { useSubmit } from "../lib/useSubmit";
import userImage from "url:../../shared/img/user.png";
import {ErrorView} from "../components/ErrorView";
import {LoadingView} from "../components/LoadingView";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const { handleSubmit: handleLogin, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/login",  {username, password: "123456"} );
    },
    () => history.push(`/home/${username}`),
  );

    useEffect(() => {
        window.onclick = function(event) {
            const modal = document.getElementById("myModal")

            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    })

  return (
      <>
          <div id="myModal" className="modal">
              <div className="modal-content">
                  <span onClick={closeModal} className="close">x</span>
                  <p>
                      Please enter your username in the field below.
                  </p>
              </div>
          </div>


        <div id="inputContainer" align="center">

          {
            submitting &&
            <div className="loading">Please wait</div>
          }
          {
            error &&
            <div className="error">{error.toString()}</div>
          }

          <img className="user" src={userImage} alt=""/>
          <h1>Login</h1>

          <form className="inputForm" onSubmit={handleLogin}>

              <InputField
                id="usernameInput"
                type="text"
                placeholder="Username"
                onChangeValue={setUsername}
                value={username}
                maxLength="12"
              />

            <button id="loginButton" disabled={submitting}/>
          </form>
        </div>
      </>
  );
}