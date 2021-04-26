import React, {useState} from "react";
import {InputField} from "./InputField";

export function CreateNewMessage() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

   async function submit(e) {
        e.preventDefault();
        console.log("Submitting", {subject, content, date});
        await fetch("/api/messages", {
            method: "POST",
            body: JSON.stringify({subject, content, date}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return <form onSubmit={submit}>
        <h1>Create a new message</h1>
        <InputField label={"Subject"} value={subject} onChangeValue={setSubject}/>
        <InputField label={"Content"} value={content} onChangeValue={setContent}/>
        <InputField label={"Date"} value={date} onChangeValue={setDate} type="date"/>
        <button>Submit</button>
    </form>;
}