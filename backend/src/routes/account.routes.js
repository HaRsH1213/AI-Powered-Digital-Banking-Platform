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
 * - GET /api/accounts/balance/:accountNumber
 * - Get Balance of mention account of the logged_in user
 * - Protected Route
 */
router.get("/balance/:accountNumber", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

/**
 * - GET /api/accounts/balance/totalBalance
 * - Get Total Balance of all account's of logged_in user
 * - Protected Route
 */

router.get("/totalBalance", authMiddleware.authMiddleware, accountController.getTotalBalanceController)

module.exports = router

