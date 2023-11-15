const express = require("express");
const Controller = require("../controllers/controllers");
const UserLogin = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const router = express.Router();

//!Read All Data
router.get("/", Controller.showData);

//!login and Register
router.post("/register", UserLogin.register);
router.post("/login", UserLogin.login);

// router.use(authentication);
//!CRUD
router.get("/bid/:id", Controller.showData);
router.post("/product", authorization, Controller.addproduct);

module.exports = router;
