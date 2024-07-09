const { Router } = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { CreateReferal } = require("../controllers/referalController");
const Routes = Router();

Routes.route("/referal").post(isAuthenticated, CreateReferal);

module.exports = Routes;
