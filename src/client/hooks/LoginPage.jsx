import { InputField } from "../components/InputField";
import React, { useState } from "react";
import { postJson } from "../lib/http";
import { useHistory } from "react-router";
import { useSubmit } from "../lib/useSubmit";
import backgroundImage from "url:../../shared/img/Portal.png";
import userImage from "url:../../shared/img/user.png";
import "../../shared/css/stylesheet.css";

export function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const { handleSubmit: handleLogin, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/login", { username, password });
    },
    () => history.push("/home"),
    console.log("test")
  );

  return (
    <div
      id="inputContainer"
      //style={{ backgroundImage: "url(" + backgroundImage + ")" }}
      align="center"
    >
      {submitting && <div>Please wait</div>}
      {error && <div>Error: {error.toString()}</div>}
      <img className="user" src={userImage}></img>
      <h1>Login</h1>
      <form type="post" className="inputForm" action={handleLogin}>
        <InputField
          id="username"
          type="text"
          placeholder="Username"
          onChangeValue={setUsername}
          value={username}
          maxLength="12"
          required
        ></InputField>
        <InputField
          id="password"
          type="password"
          placeholder="Password"
          onChangeValue={setPassword}
          value={password}
        ></InputField>
        <button id="loginButton" disabled={submitting}></button>
      </form>
    </div>
  );
}
