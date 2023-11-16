const express = require("express");
const Controller = require("../controllers/controllers");
const UserLogin = require("../controllers/userController");
const MakePayment = require("../helpers/ipaymuController");
const authentication = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const router = express.Router();

//!Read All Data
router.get("/", Controller.showData);

//!login and Register
router.post("/register", UserLogin.register);
router.post("/login", UserLogin.login);
router.post("/auth/google", UserLogin.loginGoogle);
router.get("/bid/:id", Controller.showDataDetail);
router.put("/bid/:id", Controller.updateData);

//!Payment
router.post("/payment", MakePayment.payment);

router.use(authentication);
//!CRUD

module.exports = router;
