const bcrypt = require("bcrypt");

const db = require("../model");

const jwt = require("jsonwebtoken");

exports.getRegister = (req, res) => {
  res.render("auth/register");
};

exports.postRegister = async (req, res) => {
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
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res) => {
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
      const token = jwt.sign(
        { id: user.id, userName: user.userName },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );
      res.cookie("jwtToke", token);
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
};
