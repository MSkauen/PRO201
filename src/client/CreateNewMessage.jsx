import React, {useState} from "react";

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
    <div><label>Subject: <input type="text" value={subject} onChange={e => setSubject(e.target.value)}/></label></div>
    <div><label>Content: <input type="text" value={content} onChange={e => setContent(e.target.value)}/></label></div>
    <div><label>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)}/></label></div>
        <button>Submit</button>
    </form>;
}