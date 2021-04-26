import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { AppListMessages } from "./AppListMessages";
import { CreateNewMessage } from "./CreateNewMessage";
import { EditMessage } from "./EditMessage";
import { ProfilePage } from "./ProfilePage";

function LoginPage() {
  return null;
}

function FrontPage() {
  return (
    <div>
      <h1>Front page</h1>
      <ul>
        <li>
          <Link to={"/profile"}>Profile page</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>

        <li>
          <Link to={"/messages"}>List messages</Link>
        </li>
        <li>
          <Link to={"/create"}>Create message</Link>
        </li>
      </ul>
    </div>
  );
}

function Application() {
  const messageApi = {
    listMessages: async () => {
      const res = await fetch("/api/messages");
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
    getMessage: async (id) => {
      const res = await fetch(`/api/messages/${id}`);
      if (!res.ok) {
        throw new Error(
          `Something went wrong loading ${res.url}: ${res.statusText}`
        );
      }
      return await res.json();
    },
  };
  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Home page</Link>
      </nav>
      <main>
        <Switch>
          <Route path={"/profile"}>
            <ProfilePage />
          </Route>
          <Route path={"/login"}>
            <LoginPage />
          </Route>

          <Route exact path={"/messages"}>
            <AppListMessages messageApi={messageApi} />
          </Route>
          <Route path={"/create"}>
            <CreateNewMessage />
          </Route>
          <Route path={"/messages/:id/edit"}>
            <EditMessage messageApi={messageApi} />
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
ReactDOM.render(<Application />, document.getElementById("root"));
