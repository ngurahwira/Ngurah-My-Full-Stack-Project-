const express = require("express");
const Controller = require("../controllers/controllers");
const UserLogin = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
// const MakePayment = require("../controllers/ipaymuController");

const router = express.Router();

//!Read All Data
router.get("/", Controller.showData);

//!login and Register
router.post("/register", UserLogin.register);
router.get("/bid/:id", Controller.showDataDetail);
router.post("/login", UserLogin.login);
router.post("/auth/google", UserLogin.loginGoogle);

//!Payment
// router.post("/payment", MakePayment.payment);

router.use(authentication);
//!CRUD

module.exports = router;
