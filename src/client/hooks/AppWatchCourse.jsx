import React, {useEffect, useState} from "react";
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
    const [timeLeft, setTimeLeft] = useState(user.courses[courseId].courseParts[coursePartId].courseProgress);

    const [videoPlayer, setVideoPlayer] = useState(null);
    const [isCounting, setIsCounting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(user.courses[courseId].courseParts[coursePartId].completed);

    const currentCourseName = user.courses[courseId].courseParts[coursePartId].name
    const trimmedCourseName = currentCourseName.replace(/[^a-zA-Z ]/g, "")

    const videoUrl = user.courses[courseId].courseParts[coursePartId].contentUrl
    let videoCode

    const opts = {
        playerVars: {
            autoplay: 1,
            mute: 1,
        },
    };

    const { data, error, loading, reload } = useLoading(() =>
        fetchJson("/api/profile", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    );

    if (videoUrl) {
        videoCode = videoUrl.split("embed/")[1].split("&")[0]
        if(!videoCode){
            videoCode = videoUrl.split("v=")[1].split("&")[0]
        }
    }

    useEffect(() => {
        window.onclick = function(event) {
            const modal = document.getElementById("myModal")

            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    })

    const checkElapsedTime = async (e) => {
        const duration = e.target.getDuration()
        const currentTime = e.target.getCurrentTime()
        if (timeLeft / duration < 0.15 && timeLeft <= 0) {
            setIsCompleted(true)
            setIsCounting(false)
        } else if (e.data === 2) {
            //console.log("PAUSED")
            setIsCounting(false)
        } else if (e.data === 1) {
            //console.log("PLAYING")
            setIsCounting(true)
        } else if (e.data === 0) {
            //console.log("END")
            setIsCounting(true)
        } else if (e.data === 3) {
            //console.log("BUFFERING")
            setIsCounting(false)
            }
        }

    useEffect(  () => {

        if (isCounting === true && user.username !== "") {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [timeLeft, isCounting]);

    useEffect(  () => {

        if (isCompleted === true) {
            submit().then(() => {
                history.push(`/courses/${user.username}/watch/${courseId}/${coursePartId}`)
            })
        } else if (isCompleted === false) {
            //console.log("Timeleft: " + timeLeft +" isCounting" + isCounting)
        }
        if (error) {
            return <ErrorView error={error} reload={reload} />;
        }
        if (loading || !data) {
            return <LoadingView />;
        }
    }, [ isCompleted ]);

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }
    if (loading || !data) {
        return <LoadingView />;
    }

    async function submit() {

        const res = await fetch("/api/profile", {});
        const json = await res.json();

        await fetch(`/api/courses/${user.username}/${courseId}/${coursePartId}`, {
            method: "PUT",
            body: JSON.stringify({user, courseId, coursePartId}),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                <Youtube
                    className="youtubePlayer"
                    videoId={videoCode}
                    opts={opts}
                    onStateChange={(e) => checkElapsedTime(e)}
                />
                <h1 id="timerTag"/>
            </div>
            <div className="sideBar">

                <div className="course">
                    <div className="courseDetails">
                        <h2>{user.courses[courseId].name}</h2>
                        <h2>{(parseInt(coursePartId) + 1)}/{user.courses[courseId].courseParts.length}</h2>
                    </div>
                    <div className="allVideosContainer">

                        {
                            user.courses[courseId].courseParts.map((part) => (
                                <div key={part.id} className="sideBarItem">
                                    <h4>{part.name}</h4>
                                    <div className="playButton">
                                        {
                                            part.access !== true
                                                ?
                                                <img id="lock" className="lockedIcon" src={lock} alt=""/>
                                                :
                                                <Link key={part.id} to={`/courses/${user.username}/watch/${courseId}/${part.id}`}>
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
