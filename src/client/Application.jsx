import {BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom";
import { HomePage } from "./hooks/HomePage";
import { LoginPage } from "./hooks/LoginPage";
import { EditItem } from "./hooks/LogPage";
import { InputPage } from "./hooks/InputPage";
import { EditUser } from "./hooks/EditUser";
import { FrontPage } from "./FrontPage";
import React from "react";
import { AppListUsers } from "./hooks/AppListUsers";
import helpImage from "url:../shared/img/help.png";
import logo from "url:../shared/img/logo.png";
import {AppListItems} from "./hooks/AppListItems";

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
  const itemApi = {
    //listItems: async () => await fetchJSON("/api/item"),
    getItem: async (id) => await fetchJSON(`/api/item/${id}`),
  };
  const userApi = {
    //listUsers: async () => await fetchJSON("/api/users"),
    getUser: async (id) => await fetchJSON(`/api/users/${id}`),
  };
  return (
    <BrowserRouter>
      <nav>
        <div className="navbar">
          <Link to={"/"}>
            <div className="navItem">
              <img src={logo} alt=""/>
            </div>
          </Link>
          <a id="help">
            <div className="navItem">
              <img src={helpImage} alt="Help"/>
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

          <Route exact path={"/input"} component={withRouter(InputPage)}>
            <InputPage />
          </Route>

          <Route path={"/users/:id/edit"}>
            <EditUser userApi={userApi} />
          </Route>


          <Route path={"/item/:id/edit"}>
            <EditItem itemApi={itemApi} />
          </Route>
          <Route path={"/item/:id"} component={withRouter(AppListItems)}>
            <AppListItems itemApi={itemApi} />
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
