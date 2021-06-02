import React from "react";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { fetchJson } from "../lib/http";
import "../../shared/css/main.css";
import { useParams } from "react-router";
import { MISC, PARTS } from "../lib/images.jsx"

export function AppWatchCourse({user, courseId}) {

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
        <div className="courseContainer">
            <div className="videoContainer">
                <h1>2/8 Disassembling the battery</h1>
                <iframe src={user.courses[courseId].courseParts[0].contentUrl} frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
            </div>
            <div className="sideBar">

                <div className="course">
                    <div className="courseDetails">
                        <h2>{user.courses[courseId].name}</h2>
                        <h2>2/{user.courses[courseId].courseParts.length}</h2>
                    </div>
                    <div className="allVideosContainer">

                        {
                            user.courses[courseId].courseParts.map((id) => (
                                <div key={id} className="dot">
                                    <img src={PARTS[id].image} alt=""/>
                                    <div/>
                                </div>
                            ))}

                        <div className="sideBarItem">
                            <h4>1/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>2/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>3/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>4/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>5/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>6/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>7/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>8/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>8/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>8/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
                        <div className="sideBarItem">
                            <h4>8/8 Disassembling the battery</h4>
                            <div className="playButton">
                                <img className="playIcon" src={MISC[1].image}/>
                            </div>
                        </div>
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
