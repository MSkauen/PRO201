import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { ProfilePage } from "./hooks/ProfilePage";
import { LoginPage } from "./hooks/LoginPage";
import { AppListMessages } from "./hooks/AppListMessages";
import { CreateNewMessage } from "./hooks/CreateNewMessage";
import { EditMessage } from "./hooks/EditMessage";
import { FrontPage } from "./FrontPage";
import React from "react";

export function Application() {
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
