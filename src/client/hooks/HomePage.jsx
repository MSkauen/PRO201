import React, { useEffect } from "react";
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
import { MODAL } from "../components/ModalView";
import { MISC } from "../lib/images.jsx"

export function HomePage({ user }) {

  const { data, error, loading, reload } = useLoading(() =>
    fetchJson("/api/profile", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

    useEffect(() => {
        window.onclick = function(event) {
            const modal = document.getElementById("myModal")

            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    })

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;
  return (
      <>

          <div id="myModal" className="modal">
              <div className="modal-content">
                  <span onClick={closeModal} className="close">X</span>
                  <div id="modalImagesContainerColumn">
                      <h2>
                          {MODAL.home.text}
                      </h2>
                      <img id="modalImg" src={MODAL.home.images[0].image}/>
                  </div>
                  <div id="modalImagesContainerColumn">
                      <h2>
                          {MODAL.home.text2}
                      </h2>
                      <img id="arrow" src={MISC[2].image}/>
                      <img id="modalImg" src={MODAL.home.images[1].image}/>
                  </div>

              </div>
          </div>

          <div className="optionContainer">
            <div id="buttonContainer" align="center">

                        <Link to={`/courses/${username}/`}>
                            <div id="course" className="bigButton">
                                <img src={courseImage} alt="" className="logImage"/>
                                <h5 className="main-h5">LEARN</h5>
                            </div>
                        </Link>


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
                          <a>
                              <div id="log" className="bigButton">
                                  <img id="lock" src={lock} alt=""/>
                                  <h5 className="main-h5">REPORT</h5>
                              </div>
                          </a>

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
