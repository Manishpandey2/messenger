require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./model");

const app = express();

const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.static("public/css/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    const user = await db.users.create({
      firstName,
      lastName,
      userName,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({ messsage: "User Created Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.listen(PORT, () => {
  console.log(`project has started at port ${PORT}`);
});
