const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/db")
const app = express();

app.use(
  session({
    secret: "347gh4h6kf6",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await db.checkIfValidUser(username)
    console.log(user)
    if(user) {
      if (username === user.username) {
        done(null, {username, is_admin: true});
        passport.session.username = username;
      } else {
        done(null, false, {message: "Invalid username"});
      }
    }else {
      done(null, false, {message: "Bad request"});
    }
  })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));
app.use(passport.initialize());
app.use(passport.session());

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

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.end();
});


app.get("/api/item/:id", async (req, res) => {
  const id = req.params.id;
  const item = await db.checkIfLampIsPreviouslyRepaired(id)

  if(item) {
    res.json(item);
  }
});

app.put("/api/item/:id", async (req, res) => {

  const id = parseInt(req.params.id);
  const exists = await db.checkIfLampIsPreviouslyRepaired(id)
  const { user, itemSerial, selections, location } = req.body;

  if(exists) {
    await db.updateRepairSchema(user, itemSerial, selections, id);
    res.status(200).end();
  }
});

app.post("/api/item", async (req, res) => {
  const user = req.body.user;
  const serial = req.body.serial;

  const existingItem = await db.checkIfLampIsPreviouslyRepaired(parseInt(serial))
  if(!existingItem) {
    await db.addNewRepairSchema(user, serial, location = req.body.location, [])

  }
  res.status(201).end();
});

app.get("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await db.checkIfValidUser(id)

  if(user) {
    res.json(user);
  }
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});
module.exports = app;
