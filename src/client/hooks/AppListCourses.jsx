import React, { useEffect } from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import "../../shared/css/stylesheet.css";
import "../../shared/css/chooseCourse.css";
import { PRODUCTS } from "../lib/images.jsx"
import { fetchJson } from "../lib/http";
import { Link } from "react-router-dom";
import {useHistory, useParams} from "react-router";
import { closeModal } from "../components/ModalView";
import lock from "url:../../shared/img/locked.png";
import { MODAL } from "../components/ModalView";
import { MISC } from "../lib/images.jsx"

export function AppListCourses({user}) {
    const history = useHistory();

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
      <div id="backButton" onClick={()=> (history.push(`/home/${user.username}`))}/>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={closeModal} className="close">x</span>
            <div id="modalImagesContainerColumn">
                <h2>
                    {MODAL.courses.text}
                </h2>
                <img id="modalImg" src={MODAL.courses.images[0].image} alt=""/>
            </div>
        </div>
      </div>

      <div className="chooseCourseContainer">
        <div className="productsContainer">
          {
            user.courses.map((course) => (
                  course.access !== true
                      ?
                      <a key={course.id} >
                          <div tabIndex="0" className="bigDot">
                              <img id="lock" src={lock} alt=""/>
                          </div>
                      </a>
                      :
                      <Link key={course.id} to={`/courses/${user.username}/watch/${course.id}/${course.courseParts[0].id}`}>
                          <h5 id="partNumber" className="main-h5"/>
                        <div tabIndex="0" className="bigDot">
                          <img src={PRODUCTS[course.id].image} alt=""/>
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