import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {LoadingView} from "./LoadingView";
import {InputField} from "./InputField";

function EditMessageForm({message}) {
    const [subject, setSubject] = useState(message.subject);
    const [content, setContent] = useState(message.content);
    const [date, setDate] = useState(message.date);

    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", {subject, content, date});
        await fetch(`/api/messages/${message.id}`, {
            method: "PUT",
            body: JSON.stringify({subject, content, date}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return <form onSubmit={submit}>
        <h1>Edit an existing message ({subject})</h1>
        <InputField label={"Subject"} value={subject} onChangeValue={setSubject}/>
        <InputField label={"Content"} value={content} onChangeValue={setContent}/>
        <InputField label={"Date"} value={date} onChangeValue={setDate} type="date"/>
        <button>Submit</button>
    </form>;
}

export function EditMessage({messageApi}) {
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const location = useLocation();

    async function loadMessage() {
        try {
            let id = new URLSearchParams(location.search).get("id");
            console.log({id});
            setMessage(await messageApi.getMessage(id));
        } catch (e) {
            setError(e);
        }
    }

    useEffect(loadMessage, []);

    if(error) {
        return <div>Something went wrong: {error.toString()}</div>;
    }

    if (!message) {
        return <LoadingView/>;
    }


    return <EditMessageForm message={message}/>;
}