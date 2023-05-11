const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//* method : post
//* route : /api/users/register
//* access : public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("please provide all required fields");
  }
  const userAlreadyRegistered = await User.findOne({ email });

  if (userAlreadyRegistered) {
    res.status(400);
    throw new Error("User already registered");
  }

  //* Create hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

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

//* method : post
//* route : /api/users/login
//* access : public
const loginUser = asyncHandler(async (req, res) => {
  res.json({
    message: "login the user",
  });
});

//* method : get
//* route : /api/users/current
//* access : public
const currentUser = asyncHandler(async (req, res) => {
  res.json({
    message: "current user information",
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
