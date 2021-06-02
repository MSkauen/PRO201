import React, {useState} from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { fetchJson } from "../lib/http";
import "../../shared/css/main.css";
import { useParams } from "react-router";
import lock from "url:../../shared/img/locked.png";
import { MISC, PARTS } from "../lib/images.jsx"
import Youtube from "react-youtube"

export function AppWatchCourse({user, courseId}) {
    let currentCourseName = user.courses[courseId].courseParts[0].name
    let trimmedCourseName = currentCourseName.replace(/[^a-zA-Z ]/g, "")

    let videoUrl = user.courses[courseId].courseParts[0].contentUrl
    let videoCode

    if (videoUrl) {
        videoCode = videoUrl.split("embed/")[1].split("&")[0]
    }

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
                        <h2>1/{user.courses[courseId].courseParts.length}</h2>
                    </div>
                    <div className="allVideosContainer">

                        {
                            user.courses[courseId].courseParts.map((id) => (
                                <div key={id.id} className="sideBarItem">
                                    <h4>{user.courses[courseId].courseParts[id.id].name}</h4>
                                    <div className="playButton">
                                        {
                                            user.courses[courseId].courseParts[id.id].access !== true
                                                ?
                                                <img id="lock" className="lockedIcon" src={lock} alt=""/>
                                                :
                                                <img className="playIcon" src={MISC[1].image}/>
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

    return <AppWatchCourse user={user} courseId={courseId} />;
}
