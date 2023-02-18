const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/signin").get(users.showSignInPage).post(users.signIn);

router.route("/signup").get(users.showSignUpPage).post(users.signUp);

module.exports = router;