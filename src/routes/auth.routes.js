const express = require("express")

const authController = require("../controller/auth.controller")

const router  = express.Router()


router.post("/register", authController.registerUserController)
router.post("/login", authController.loginUserController)


router.post("/logout", authController.userLogoutController)


module.exports = router