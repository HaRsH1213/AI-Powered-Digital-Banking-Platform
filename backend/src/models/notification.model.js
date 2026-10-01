const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
        index : true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "transaction",
        default : null

    },
    category: {
        type: String,
        enum: ["ACCOUNT", "TRANSACTION", "SECURITY"],
        required: true
    },
    type: {
        type: String,
        enum: ["ACCOUNT_CREATED", "EMAIL_VERIFIED", "MONEY_CREDITED", "MONEY_DEBITED", "TRANSFER_COMPLETED", "TRANSFER_FAILED", "LOGIN_ALERT"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    }

}, {timestamps: true}
)

notificationSchema.index({user: 1, isRead: 1, createdAt: -1})

const notificationModel = mongoose.model("notifications", notificationSchema)

module.exports = notificationModel
