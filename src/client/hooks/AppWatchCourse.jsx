import React, { useEffect } from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { fetchJson } from "../lib/http";
import "../../shared/css/main.css";
import {useHistory, useParams} from "react-router";
import lock from "url:../../shared/img/locked.png";
import { MISC } from "../lib/images.jsx"
import Youtube from "react-youtube"
import {closeModal} from "../components/ModalView";
import {Link} from "react-router-dom";

export function AppWatchCourse({user, courseId, coursePartId}) {
    const history = useHistory();

    let currentCourseName = user.courses[courseId].courseParts[coursePartId].name
    let trimmedCourseName = currentCourseName.replace(/[^a-zA-Z ]/g, "")

    let videoUrl = user.courses[courseId].courseParts[coursePartId].contentUrl
    let videoCode

    if (videoUrl) {
        videoCode = videoUrl.split("embed/")[1].split("&")[0]
    }

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

    const checkElapsedTime = (e) => {
        console.log(e.target.getCurrentTime());
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.95) {
            console.log("completed")
        }
    };

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }
    if (loading || !data) {
        return <LoadingView />;
    }

    return (
    <>
        <div id="backButton" onClick={()=> (history.push(`/courses/${user.username}`))}/>

        <div id="myModal" className="modal">
            <div className="modal-content">
                <span onClick={closeModal} className="close">x</span>
                <p>
                    Please enter your username in the field below.
                </p>
            </div>
        </div>

        <div className="courseContainer">
            <div className="videoContainer">
                <h1>{trimmedCourseName}</h1>
                <Youtube className="youtubePlayer" videoId={videoCode} onStateChange={(e) => checkElapsedTime(e)}
                />
            </div>
            <div className="sideBar">

                <div className="course">
                    <div className="courseDetails">
                        <h2>{user.courses[courseId].name}</h2>
                        <h2>{(parseInt(coursePartId) + 1)}/{user.courses[courseId].courseParts.length}</h2>
                    </div>
                    <div className="allVideosContainer">

                        {
                            user.courses[courseId].courseParts.map((id) => (
                                <div key={id.id} className="sideBarItem">
                                    <h4>{id.name}</h4>
                                    <div className="playButton">
                                        {
                                            id.access !== true
                                                ?
                                                <img id="lock" className="lockedIcon" src={lock} alt=""/>
                                                :
                                                <Link key={id.id} to={`/courses/${user.username}/watch/${courseId}/${id.id}`}>
                                                    <img className="playIcon" src={MISC[1].image} alt=""/>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export function GetUser({ userApi }) {
    const { id } = useParams()
    const { courseId } = useParams()
    const { coursePartId } = useParams()

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

    return <AppWatchCourse user={user} courseId={courseId} coursePartId={coursePartId} />;
}
