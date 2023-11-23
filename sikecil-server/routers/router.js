const express = require("express");
const Controller = require("../controllers/controllers");
const UserLogin = require("../controllers/userController");
const MakePayment = require("../helpers/ipaymuController");
const authentication = require("../middlewares/authentication");
// const { authorization } = require("../middlewares/authorization"); //? saat ini belum di gunakan

const router = express.Router();

//!Read All Data
router.get("/", Controller.showData);

//!login and Register
router.post("/register", UserLogin.register);
router.post("/login", UserLogin.login);
router.post("/auth/google", UserLogin.loginGoogle);
router.get("/bid/:id", Controller.showDataDetail);
router.get("/checkout/:id", Controller.showDataCheckOut);
router.put("/bid/:id", Controller.updateData);

//!Payment
router.post("/payment/:id", MakePayment.payment);

// router.use(authentication); //? saat ini masih di handle di client
//!CRUD

module.exports = router;
