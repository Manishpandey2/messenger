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
    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({
        message: "All the fields are required",
      });
    }
    const existtingUser = await db.users.findOne({
      where: {
        email: email,
      },
    });
    if (existtingUser) {
      return res.status(400).json({
        message: "Email address already exists",
      });
    }
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
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "user not registered",
      });
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    if (isMatched) {
      return res.status(200).json({
        message: "User Logged in Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
app.listen(PORT, () => {
  console.log(`project has started at port ${PORT}`);
});
