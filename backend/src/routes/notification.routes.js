const express = require("express")
const  authMiddleware = require("../middlewares/auth.middleware")
const notificationController = require("../controller/notification.controller")




const notificationRoutes = express.Router()


notificationRoutes.get("/", authMiddleware.authMiddleware, notificationController.getNotifications)
notificationRoutes.patch("/read-all", authMiddleware.authMiddleware, notificationController.markAllNotificationsAsRead)

module.exports = notificationRoutes