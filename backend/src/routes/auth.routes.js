const express = require("express")

const authController = require("../controller/auth.controller")
const authMiddleware  = require("../middlewares/auth.middleware")

const router  = express.Router()


router.post("/register", authController.registerUserController)
router.post("/login", authController.loginUserController)


router.post("/logout", authController.userLogoutController)

router.get("/me", authMiddleware.authMiddleware, authController.getCurrentUserController )


module.exports = router