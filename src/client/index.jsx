import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {AppListMessages} from "./AppListMessages";
import {CreateNewMessage} from "./CreateNewMessage";
import {EditMessage} from "./EditMessage";

function Application () {

    const messageApi = {
        listMessages: async () => {
            const res = await fetch("/api/messages");
            if (!res.ok) {
                throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
            }
            return await res.json();
        },
        getMessage: async (id) => {
            const res = await fetch(`/api/messages/${id}`);
            if (!res.ok) {
                throw new Error(`Something went wrong loading ${res.url}: ${res.statusText}`);
            }
            return await res.json();
        }
    }
    return <BrowserRouter>
        <nav>
            <Link to={"/"}>Home page</Link>
        </nav>
        <main>
            <Switch>
                <Route exact path={"/messages"}>
                    <AppListMessages messageApi={messageApi}/>
                </Route>
                <Route path={"/create"}>
                    <CreateNewMessage/>
                </Route>
                <Route path={"/edit"}>
                    <EditMessage messageApi={messageApi}/>
                </Route>
                <Route exact path={"/"}>
                    <h1>Home page</h1>
                    <ul>
                        <li><Link to={"/messages"}>List messages</Link></li>
                        <li><Link to={"/create"}>Create message</Link></li>
                    </ul>
                </Route>
                <Route>
                    Page not found
                </Route>
            </Switch>
        </main>
    </BrowserRouter>;
}
ReactDOM.render(<Application />, document.getElementById("root"));