import React, { useEffect } from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import "../../shared/css/stylesheet.css";
import "../../shared/css/chooseCourse.css";
import { PRODUCTS } from "../lib/images.jsx"
import { fetchJson } from "../lib/http";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { closeModal } from "../components/ModalView";
import lock from "url:../../shared/img/locked.png";

export function AppListCourses({user}) {

  useEffect(() => {
    window.onclick = function(event) {
      const modal = document.getElementById("myModal")

      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  })

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

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={closeModal} className="close">x</span>
          <p>
            Please enter your username in the field below.
          </p>
        </div>
      </div>

      <div className="chooseCourseContainer">
        <div className="productsContainer">
          {
            user.courses.map((id) => (
                  id.access !== true
                      ?
                        <div key={id.id} tabIndex="0" className="bigDot">
                          <img id="lock" src={lock} alt=""/>
                        </div>
                      :
                      <Link key={id.id} to={`/courses/${user.username}/watch/${id.id}/0`}>
                        <div tabIndex="0" className="bigDot">
                          <img src={PRODUCTS[id.id].image} alt=""/>
                        </div>
                      </Link>
            ))}
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

  return <AppListCourses user={user} />;
}