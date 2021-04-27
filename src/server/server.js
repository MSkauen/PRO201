require("dotenv").config();
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(
  session({
    secret: "347gh4h6kf6",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === "second" && password === "123456") {
      done(null, { username, is_admin: true });
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth2callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, { username: profile.emails[0].value });
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());
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

app.post("/api/profile", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  if (!req.user) {
    return res.status(401).send();
  }
  const { username } = req.user;
  res.json({ username });
});

app.get("/api/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  const { username } = req.user;
  res.json({ username });
});

app.options("/api/profile", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header("Access-Control-Allow-Headers", "*");
  res.end();
});

app.get(
  "/api/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/api/oauth2callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.end();
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
