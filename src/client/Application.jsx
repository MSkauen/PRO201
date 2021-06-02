import {BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom";
import { GetUserData } from "./hooks/HomePage";
import { showModal } from "./components/ModalView";
import { LoginPage } from "./hooks/LoginPage";
import { EditItem } from "./hooks/LogPage";
import { InputPage } from "./hooks/InputPage";
import { GetUser } from "./hooks/AppWatchCourse";
import React from "react";
import { GetCourses } from "./hooks/AppListCourses";
import helpImage from "url:../shared/img/help.png";
import logo from "url:../shared/img/logo.png";
import { GetItem } from "./hooks/AppListItems";

async function fetchJSON(url = "") {
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
  const courseApi = {
    listProducts: async () => await fetchJSON("/api/products"),
    //getProduct: async (id) => await fetchJSON(`/api/course/${id}`),
    getProductCourse: async (id) => await fetchJSON(`/api/course/${id}`),
  };
  const userApi = {
    //listUsers: async () => await fetchJSON("/api/users"),
    getProfileName: async () => await fetchJSON(`/api/profile`),
    getUserData: async (id) => await fetchJSON(`/api/user/${id}`),
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
          <a onClick={showModal} id="help">
            <div className="navItem">
              <img src={helpImage} alt="Help"/>
              <p className="help-image-description">Help</p>
            </div>
          </a>
        </div>
      </nav>
      <main>
        <Switch>

          <Route exact path={"/"}>
            <LoginPage />
          </Route>

          <Route path={"/home/:id"}>
            <GetUserData userApi={userApi} />
          </Route>

          <Route exact path={"/input"} component={withRouter(InputPage)}>
            <InputPage />
          </Route>

          <Route path={"/item/:id/edit"}>
            <EditItem itemApi={itemApi} />
          </Route>

          <Route path={"/item/:id/success"}>
            <GetItem itemApi={itemApi}/>
          </Route>

          <Route exact path={"/courses/:id"}>
            <GetCourses userApi={userApi} />
          </Route>

          <Route exact path={"/courses/:id/watch/:courseId"}>
            <GetUser userApi={userApi} />
          </Route>

          <Route>Page not found</Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
