const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const messages = [{
    id: 1,
    subject: "First contact",
    content: "Hello World",
    date: "2021-12-03",
},
    {
        id: 2,
        subject: "Exam time",
        content: "Hello Dreamer",
        date: "2021-12-05",    }
];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/messages", (req, res)  => {
    console.log(messages);
    res.json(messages);
})

app.get("/api/messages/:id", (req, res)  => {
    const id = parseInt(req.params.id);
    const message = messages.find(m => m.id === id);
    res.json(message);
})

app.put("/api/messages/:id", (req, res)  => {
    const id = parseInt(req.params.id);
    const messageIndex = messages.findIndex(m => m.id === id);
    const {subject, content, date} = req.body;
    messages[messageIndex] = {subject, content, date, id};
    res.status(200).end();
})

app.post("/api/messages", (req, res) => {
    const {subject, content, date} = req.body;
    messages.push({subject, content, date, id: messages.length+1})
    res.status(201).end();
});

app.use((req, res, next) => {
    if(req.method !== "GET" || req.path.startsWith("/api")) {
        return next();
    }

    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
})


app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
});