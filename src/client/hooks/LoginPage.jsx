import { InputField } from "../components/InputField";
import React, { useState } from "react";
import { postJson } from "../lib/http";
import { useHistory } from "react-router";
import { useSubmit } from "../lib/useSubmit";
import userImage from "url:../../shared/img/user.png";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { handleSubmit: handleLogin, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/login", { username, password });
    },
    () => history.push("/home"),
  );


  return (
      <>
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
          <InputField
            id="passwordInput"
            type="password"
            placeholder="Password"
            onChangeValue={setPassword}
            value={password}
          />
        <button id="loginButton" disabled={submitting}/>
      </form>
    </div>
          </>
  );
}
