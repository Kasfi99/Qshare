//Require Path and Module dependencies
const express = require("express");
const errorHandler = require("../middlewares/errorhandler");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");

//Handle the users traffic
router.post("/user/sign-up", Controller.SignUp);
router.post("/user/sign-in", Controller.SignIn);

//handle the order traffic
router.use(authentication);
router.get("/order/my-order", Controller.getMyOrder);
router.post("/order/add-order", Controller.MakeMyOrder);

//handling error
router.use(errorHandler);

module.exports = router;
