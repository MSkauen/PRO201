import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
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
          <Link to={"/users"}>List users</Link>
        </li>
        <li>
          <Link to={"/newuser"}>Create user</Link>
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
