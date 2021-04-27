const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "347gh4h6kf6",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());

const messages = [
  {
    id: 1,
    subject: "First contact",
    content: "Hello World",
    date: "2021-12-03",
  },
  {
    id: 2,
    subject: "Exam time",
    content: "Hello Dreamer",
    date: "2021-12-05",
  },
];

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/profile", (req, res) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "second" && password === "123456") {
    req.session.username = username;
    res.end();
  } else {
    res.sendStatus(401);
  }
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.get("/api/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages.find((m) => m.id === id);
  res.json(message);
});

app.put("/api/messages/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const messageIndex = messages.findIndex((m) => m.id === id);
  const { subject, content, date } = req.body;
  messages[messageIndex] = { subject, content, date, id };
  res.status(200).end();
});

app.post("/api/messages", (req, res) => {
  const { subject, content, date } = req.body;
  messages.push({ subject, content, date, id: messages.length + 1 });
  res.status(201).end();
});
/*
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
});
*/
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

const server = https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
  });
