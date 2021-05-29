import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { Link } from "react-router-dom";
import "../../shared/css/stylesheet.css";
import { PRODUCTS } from "../lib/images.jsx"
import {fetchJson} from "../lib/http";

export function AppListProducts() {

  const { data, error, loading, reload } = useLoading(() =>
      fetchJson("/api/profile", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      })
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  return (
    <>
      <div className="chooseCourseContainer">
        <div className="productsContainer">
          <a href="https://mskauen.github.io/pro201eksamen/sunbellCourse.html">
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[0].image} alt=""/>
            </div>
          </a>
          <a href="https://mskauen.github.io/pro201eksamen/moveSmartCourse.html">
            <div tabIndex="0" className="bigDot">
              <img src="img/products/Bright_Move_Red.png" alt=""/>
                <div/>
            </div>
          </a>
          <a href="https://mskauen.github.io/pro201eksamen/sunbellCourse.html">
            <div tabIndex="0" className="bigDot">
              <img src="img/products/sunturtle-red.png" alt=""/>
                <div/>
            </div>
          </a>
        </div>
      </div>
      <h1>List users</h1>
      {users.map(({ id, firstName, lastName }) => (
        <li key={id}>
          <Link to={`/users/${id}/edit`}>
            {firstName} {lastName}
          </Link>
        </li>
      ))}
    </>
  );
}
