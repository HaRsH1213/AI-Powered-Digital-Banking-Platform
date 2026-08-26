const express = require("express")
const accountController = require("../controller/accounts.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()


router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)


/**
 * - GET /api/accounts/
 * - Get all accounts of the logged_in user
 * - Protected Route
 */

router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 * - Get total Balance of the logged_in user
 * - Protected Route
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = router

