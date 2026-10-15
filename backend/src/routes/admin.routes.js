const express = require("express")
const adminController = require("../controller/admin.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const adminRoutes = express.Router()


adminRoutes.get("/overview", authMiddleware.authSystemUserMiddleware, adminController.getAdminOverviewController)
adminRoutes.get("/customers",authMiddleware.authSystemUserMiddleware, adminController.getCustomersController)
adminRoutes.get("/customers/:customerId", authMiddleware.authSystemUserMiddleware, adminController.getCustomerDetailsController)



module.exports = adminRoutes
