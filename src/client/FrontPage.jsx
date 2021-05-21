import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Front page</h1>
      <ul>
        <li>
          <Link to={"/home"}>Profile page</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>

        <li>
          <Link to={"/users"}>Users</Link>
        </li>
        <li>
          <Link to={"/newuser"}>Create user</Link>
        </li>

        <li>
          <Link to={"/item"}>Messages</Link>
        </li>
        <li>
          <Link to={"/create"}>Send message</Link>
        </li>
      </ul>
    </div>
  );
}
