const express = require("express");
const bp = require("body-parser");
const debug = require("debug")("app");
const path = require("path");
const app = express();
const ejsLint = require("ejs-lint");

const router = express.Router();
const port = 4000;
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.set("views", "./src/views");
app.set("view engine", "ejs");

const logger = require("morgan");
app.use(logger("tiny"));
app.use("/", router);
app.use("/css", express.static(path.join(__dirname, "public/css")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

router.post("/form", (req, res, next) => {
  let form_details = {
    FirstName: req.body.FN,
    Email: req.body.mail,
    LastName: req.body.LN,
    Phone: req.body.Phone,
  };
  res.render("successfull", { form_details: form_details });
});

app.listen(port, () => {
  debug(`server running on port ${port}`);
});
