const express = require("express");
const bp = require("body-parser");
const debug = require("debug")("app");
const path = require("path");
const app = express();
require("dotenv").config();
// const mongoose = require("mongoose");
const ejsLint = require("ejs-lint");
const db_form_details = require("./db");
const db_users = require("./users");

const router = express.Router();
const port = 4000;
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.set("views", "./src/views");
app.set("view engine", "ejs");

const logger = require("morgan");
// const db = require("./db");
app.use(logger("tiny"));
app.use("/", router);
app.use("/css", express.static(path.join(__dirname, "public/css")));

const user = db_users.connectdb();

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/src/views/index"));
});

app.get("/registare", (req, res) => {
  res.render(path.join(__dirname, "/src/views/registare"));
});

app.post("/registare", (req, res, next) => {
  let new_user_details = {
    username: req.body.username,
    password: req.body.password,
  };
  db_users.registare_user(user, new_user_details);
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "/src/views/login"));
});

app.post("/login", (req, res, next) => {
  let login_user_details = {
    username: req.body.username,
    password: req.body.password,
  };
  (async function () {
    let loggedIn = await db_users.login_user(user, login_user_details);
    if (loggedIn) {
      res.render("index");
    } else {
      res.render("login");
    }
  })();
});

router.post("/form", (req, res, next) => {
  let form_details = {
    FirstName: req.body.FN,
    Email: req.body.mail,
    LastName: req.body.LN,
    Phone: req.body.Phone,
    Message: req.body.message,
  };
  res.render("successfull", { form_details: form_details });
  db_form_details.db_update_data(form_details);
});

app.listen(port, () => {
  debug(`server running on port ${port}`);
});
