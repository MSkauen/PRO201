import { InputField } from "../components/InputField";
import { closeModal } from "../components/ModalView";
import React, {useEffect, useState} from "react";
import { postJson } from "../lib/http";
import { useHistory } from "react-router";
import { useSubmit } from "../lib/useSubmit";
import userImage from "url:../../shared/img/user.png";
import { MODAL } from "../components/ModalView";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const history = useHistory("");

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
                  <span onClick={closeModal} className="close">X</span>

                      <h1>{MODAL.login.text}</h1>
                      <div id = "modalImages">
                          <div id = "modalImagesContainer">
                              <img id="modalImg" src={MODAL.login.images.badLogins[0].image} alt=""/>
                              <img id="modalErrorImg" src={MODAL.login.images.error.image} alt=""/>
                          </div>
                          <div id = "modalImagesContainer">
                              <img id="modalImg" src={MODAL.login.images.badLogins[1].image} alt=""/>
                              <img id="modalErrorImg" src={MODAL.login.images.error.image} alt=""/>
                          </div>
                          <div id = "modalImagesContainer">
                              <img id="modalImg" src={MODAL.login.images.goodLogins[0].image} alt=""/>
                              <img id="modalCheckmarkImg" src={MODAL.login.images.checkmark.image} alt=""/>
                          </div>
                          <div id = "modalImagesContainer">
                              <img id="modalImg" src={MODAL.login.images.goodLogins[1].image} alt=""/>
                              <img id="modalCheckmarkImg" src={MODAL.login.images.checkmark.image} alt=""/>
                          </div>
                      </div>

              </div>
          </div>

        <div id="inputContainer" align="center">

            {
                submitting &&
                <div className="loading">Please wait</div>
            }
            {
                error &&
                <div className="error"/>
            }

          <img className="user" src={userImage} alt=""/>
          <h1>Login</h1>

          <form className="inputForm" onSubmit={handleLogin}>

              <InputField
                id="usernameInput"
                type="text"
                placeholder='Type "demo" for access'
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