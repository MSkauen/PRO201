import React, {useState} from "react";
import { LoadingView } from "../components/LoadingView";
import { closeModal } from "../components/ModalView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { fetchJson } from "../lib/http";
import "../../shared/css/main.css";
import { Link } from "react-router-dom";
import logImage from "url:../../shared/img/logImg.png";
import courseImage from "url:../../shared/img/courseImg.png";
import lock from "url:../../shared/img/locked.png";
import {useParams} from "react-router";
import {AppWatchCourse} from "./AppWatchCourse";

export function HomePage({ user }) {
    const {isLocked, setIsLocked} = useState(user.certification)

    console.log(user.username + " " + user.certification)
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
      <>
          {window.onclick = function(event) {
              const modal = document.getElementById("myModal")

              if (event.target === modal) {
                  modal.style.display = "none";
              }
          }}
          <div id="myModal" className="modal">
              <div className="modal-content">
                  <span onClick={closeModal} className="close">x</span>
                  <p>
                      Please choose LEARN to get started with your certification.
                        <br/>
                      If you are already certified to repair Bright lamps, please choose REPORT to start logging your repairs.
                  </p>
              </div>
          </div>

          <div className="optionContainer">
            <div id="buttonContainer" align="center">

                    {
                        user.certification !== ""
                    ?
                        <Link to={`/courses/${username}/`}>
                            <div id="course" className="bigButton">
                                <img src={courseImage} alt="" className="logImage"/>
                                <h5 className="main-h5">LEARN</h5>
                            </div>
                        </Link>


                            :
                        <div id="course" className="bigButton">
                            <img id="lock" src={lock} alt=""/>
                            <h5 className="main-h5">LEARN {isLocked}</h5>
                        </div>
                    }

                  {
                      user.certification !== ""
                      ?
                          <Link to={"/input"}>
                              <div id="log" className="bigButton">
                                  <img src={logImage} alt="" className="logImage"/>
                                  <h5 className="main-h5">REPORT</h5>
                              </div>
                          </Link>
                      :
                          <div id="log" className="bigButton">
                              <img id="lock" src={lock} alt=""/>
                              <h5 className="main-h5">REPORT</h5>
                          </div>
                  }

            </div>
          </div>
      </>
  );
}

export function GetUserData({ userApi }) {
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

    return <HomePage user={user} />;
}
