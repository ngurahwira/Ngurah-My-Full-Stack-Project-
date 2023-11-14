const express = require("express");
const Controller = require("../controllers/controllers");
const UserLogin = require("../controllers/userController");

const router = express.Router();

//!Read All Data
router.get("/", Controller.showData);

//!login and Register
router.post("/register", UserLogin.register);
router.post("/login", UserLogin.login);
module.exports = router;
