const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const messages = [{
    id: 1,
    subject: "First contact",
    content: "Hello World",
    date: "date:2323232",
},
    {
        id: 2,
        subject: "Exam time",
        content: "Hello Dreamer",
        date: "date:45345",    }
];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/messages", (req, res)  => {
    console.log(messages);
    res.json(messages);
})

app.post("/api/messages", (req, res) => {
    const {subject, content, date} = req.body;
    messages.push({subject, content, date, id: messages.length+1})
    res.status(201);
    res.end();
});

app.use((req, res, next) => {
    if(req.method !== "GET") {
        return next();
    }

    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
})


app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
});