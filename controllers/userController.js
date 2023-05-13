const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//! Register New User ------------------------------------------
//* method : post
//* route : /api/users/register
//* access : public
const registerUser = asyncHandler(async (req, res) => {
  //* Check for empty values -----------------------------------
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("please provide all required fields");
  }

  //* Check if the user already registered ---------------------
  const userAlreadyRegistered = await User.findOne({ email });

  if (userAlreadyRegistered) {
    res.status(400);
    throw new Error("User already registered");
  }

  //* Create hash password -------------------------------------
  const hashedPassword = await bcrypt.hash(password, 10);

  //* Create new user on the Database --------------------------
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  //* Sending back user information without password -----------
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User data not found");
  }
});

//*! Login User -------------------------------------------------
//* method : post
//* route : /api/users/login
//* access : public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("Please enter your email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200);
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }

  res.json({
    message: "login the user",
  });
});

//* method : get
//* route : /api/users/current
//* access : private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
