import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import "../../shared/css/stylesheet.css";
import "../../shared/css/chooseCourse.css";
import { PRODUCTS } from "../lib/images.jsx"
import { fetchJson } from "../lib/http";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export function AppListCourses({user}) {

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

          <Link to={`/courses/${user.username}/watch/${user.courses[0].id}`}>
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[0].image} alt=""/>
            </div>
          </Link>

          <Link to={`/courses/${user.username}/watch/${user.courses[1].id}`}>
          <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[1].image} alt=""/>
                <div/>
            </div>
          </Link>

          <Link to={`/courses/${user.username}/watch/${user.courses[2].id}`}>
            <div tabIndex="0" className="bigDot">
              <img src={PRODUCTS[2].image} alt=""/>
                <div/>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}

export function GetCourses({ userApi }) {
  const { id } = useParams()
  const { data: user, loading, error, reload } = useLoading(
      async () => await userApi.getUserData(id),
      [id]
  );
  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }
  console.log(user)
  return <AppListCourses user={user} />;
}