require("dotenv").config();
const express = require("express");
const db = require("./model");

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.static("public/css/"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.listen(PORT, () => {
  console.log(`project has started at port ${PORT}`);
});
