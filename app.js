require("dotenv").config();
const express = require("express");

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.static("public/css/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const homeRoute = require("./routes/homeRoute");
const authRoute = require("./routes/authRoutes");

app.use("", homeRoute);
app.use("", authRoute);
app.listen(PORT, () => {
  console.log(`project has started at port ${PORT}`);
});
