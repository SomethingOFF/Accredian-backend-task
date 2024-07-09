const { Router } = require("express");

const {
  LoginUser,
  registerUser,
  logout,
} = require("../controllers/userController");
const Routes = Router();

Routes.route("/register").post(registerUser);
Routes.route("/login").post(LoginUser);
Routes.route("/logout").get(logout);

module.exports = Routes;
