import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { HomePage } from "./hooks/HomePage";
import { LoginPage } from "./hooks/LoginPage";
import { AppListMessages } from "./hooks/AppListMessages";
import { CreateNewMessage } from "./hooks/CreateNewMessage";
import { CreateNewUser } from "./hooks/CreateNewUser";
import { EditResponse } from "./hooks/EditResponse";
import { EditUser } from "./hooks/EditUser";
import { FrontPage } from "./FrontPage";
import React from "react";
import { AppListUsers } from "./hooks/AppListUsers";
import helpImage from "url:../shared/img/help.png";
import logo from "url:../shared/img/logo.png";

async function fetchJSON(url = "/api/messages") {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Something went wrong loading ${res.url}: ${res.statusText}`
    );
  }
  return await res.json();
}

export function Application() {
  const messageApi = {
    listMessages: async () => await fetchJSON("/api/messages"),
    getMessage: async (id) => await fetchJSON(`/api/messages/${id}`),
  };
  const userApi = {
    listUsers: async () => await fetchJSON("/api/users"),
    getUser: async (id) => await fetchJSON(`/api/users/${id}`),
  };
  return (
    <BrowserRouter>
      <nav>
        <div className="navbar">
          <Link to={"/"}>
            <div className="navItem">
              <img src={logo} alt=""></img>
            </div>
          </Link>
          <a id="help">
            <div className="navItem">
              <img src={helpImage} alt="Help"></img>
              <p className="help-image-description">Help</p>
            </div>
          </a>
        </div>
      </nav>
      <main>
        <Switch>
          <Route path={"/home"}>
            <HomePage />
          </Route>
          <Route path={"/login"}>
            <LoginPage />
          </Route>

          <Route exact path={"/users"}>
            <AppListUsers userApi={userApi} />
          </Route>
          <Route path={"/newuser"}>
            <CreateNewUser />
          </Route>
          <Route path={"/users/:id/edit"}>
            <EditUser userApi={userApi} />
          </Route>

          <Route exact path={"/messages"}>
            <AppListMessages messageApi={messageApi} />
          </Route>
          <Route path={"/create"}>
            <CreateNewMessage />
          </Route>
          <Route path={"/messages/:id/edit"}>
            <EditResponse messageApi={messageApi} />
          </Route>
          <Route exact path={"/"}>
            <FrontPage />
          </Route>
          <Route>Page not found</Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
