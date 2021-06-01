import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import "../../shared/css/stylesheet.css";
import "../../shared/css/chooseCourse.css";
import { PRODUCTS } from "../lib/images.jsx"
import {fetchJson} from "../lib/http";
import {Link} from "react-router-dom";

export function AppListProducts() {
  const id  = null;
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
          <Link to="/course/${id}">
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[0].image} alt=""/>
            </div>
          </Link>
          <a href="https://mskauen.github.io/pro201eksamen/moveSmartCourse.html">
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[1].image} alt=""/>
                <div/>
            </div>
          </a>
          <a href="https://mskauen.github.io/pro201eksamen/sunbellCourse.html">
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[2].image} alt=""/>
                <div/>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
