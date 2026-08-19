const express = require("express")
const accountController = require("../controller/accounts.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()


router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)

module.exports = router