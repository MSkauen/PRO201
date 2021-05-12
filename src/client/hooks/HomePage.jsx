import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { fetchJson } from "../lib/http";
import "../../shared/css/stylesheet.css";
import { BrowserRouter, Link } from "react-router-dom";
import logImage from "url:../../shared/img/logImg.png";
import courseImage from "url:../../shared/img/courseImg.png";

export function HomePage() {
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

  const { username } = data;

  return (
    <BrowserRouter>
      <div className="optionContainer">
        <div id="buttonContainer" align="center">
          <Link to={"/input"}>
            <div id="log" className="bigButton">
              <img src={logImage} className="logImage"></img>
              <h5 className="main-h5">REPORT</h5>
            </div>
          </Link>

          <Link href="https://mskauen.github.io/pro201eksamen/chooseCourse.html">
            <div id="course" className="bigButton">
              <img src={courseImage} lassName="logImage"></img>
              <h5 className="main-h5">LEARN</h5>
            </div>
          </Link>
        </div>
      </div>
    </BrowserRouter>
  );
}