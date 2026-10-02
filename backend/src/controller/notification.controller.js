const notificationModel = require("../models/notification.model")


async function getNotifications(req, res){
    const limit = 20
    try {
        const [notifications, unreadCount] = await Promise.all([
        notificationModel
            .find({user: req.user._id})
            .sort({createdAt: -1})
            .limit(limit)
            .lean(),
        notificationModel.countDocuments({user: req.user._id, isRead: false})
    ])
    return res.status(200).json({ notifications, unreadCount })
        
    } catch (error) {
        console.error("Unable to fetch notifications", error)
        return res.status(500).json({ message: "Unable to fetch notifications" })
        
    }
    
}

async function markAllNotificationsAsRead(req, res){
    try {
        await notificationModel.findOneAndUpdate(
            {user:req.user._id, isRead:false},
            {$set:{isRead:true}})
        return res.status(200).json({ message: "All notifications marked as read" })
    } catch (error) {
        console.error("Unable to mark notifications as read", error)
        return res.status(500).json({ message: "Unable to update notifications" })
    }
}


module.exports = {getNotifications, markAllNotificationsAsRead}