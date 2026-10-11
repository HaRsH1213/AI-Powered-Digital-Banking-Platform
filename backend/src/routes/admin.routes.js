const express = require("express")
const adminController = require("../controller/admin.controller")
const authMiddleware = require("../middlewares/auth.middleware")

adminRoutes = express.Router()


adminRoutes.get("/overview", authMiddleware.authSystemUserMiddleware, adminController.getAdminOverviewController)


module.exports = adminRoutes