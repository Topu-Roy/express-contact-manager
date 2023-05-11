const asyncHandler = require("express-async-handler");

//* method : post
//* route : /api/users/register
//* access : public
const registerUser = asyncHandler(async (req, res) => {
  res.json({
    message: "Register the user",
  });
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
