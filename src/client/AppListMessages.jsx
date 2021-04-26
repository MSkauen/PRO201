import React, {useState, useEffect} from "react";
import {LoadingView} from "./LoadingView";

export function AppListMessages() {
    const [messages, setMessages] = useState();
    const [error, setError] = useState();

    async function loadMessage() {
        try {
            const res = await fetch("/api/messages");
            if (!res.ok) {
                throw new Error("Something went wrong loading " + res.url + ": " + res.statusText);
            }

            const json = await res.json();
            setMessages(json);
        } catch (e) {
            setError(e);
        }
    }

    useEffect(loadMessage, []);

    if(error) {
        return <div>Something went wrong</div>;
    }
    if (!messages) {
        return <LoadingView/>
    }

    return <>
    <h1>List all the books</h1>
        {messages.map(({id, subject}) => (
            <li key={id}>{subject}</li>
            ))}
        </>;
}