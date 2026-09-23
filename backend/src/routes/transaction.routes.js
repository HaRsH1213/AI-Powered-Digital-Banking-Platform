const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const transactionController = require("../controller/transaction.controller")

const transactionRoutes = express.Router()

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction )

transactionRoutes.get("/", authMiddleware.authMiddleware, transactionController.fetchTransactions)



transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialTransaction )

module.exports = transactionRoutes