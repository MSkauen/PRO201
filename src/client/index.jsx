import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {AppListMessages} from "./AppListMessages";
import {CreateNewMessage} from "./CreateNewMessage";

function Application () {
    return <BrowserRouter>
        <nav>
            <Link to={"/"}>Home page</Link>
        </nav>
        <main>
            <Switch>
                <Route path={"/messages"}>
                    <AppListMessages/>
                </Route>
                <Route path={"/create"}>
                    <CreateNewMessage/>
                </Route>
                <Route path={"/edit"}>
                    <h1>Edit an existing book</h1>
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