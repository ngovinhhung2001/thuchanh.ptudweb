const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/signin").post(users.signIn);

router.route("/signup").post(users.signUp);

module.exports = router;