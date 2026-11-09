const notificationModel = require("../models/notification.model")
const userModel = require("../models/user.model")

const formatAmount = (amount)=> `₹${Number(amount).toLocaleString('en-IN')}`
const getUserName = async(userId) => {
    const user = await userModel.findById(userId)
    return user.name
}


const createCompletedTransferNotification = async({transaction, fromAccount, toAccount}) =>{
    const amount = Number(transaction.amount)
    const fromUserId = fromAccount.user.toString()
    const fromUserName = await getUserName(fromUserId)
    const toUserId = toAccount.user.toString()
    const toUserName = await getUserName(toUserId)
    if(fromUserId === toUserId){
        return notificationModel.create({
            user: fromUserId,
            transaction: transaction._id,
            category: "TRANSACTION",
            type: "TRANSFER_COMPLETED",
            title: "Transfer Completed",
            message: `${formatAmount(amount)} moved from ${fromAccount.accountName} to ${toAccount.accountName}`,
            amount
        })
    }
    return notificationModel.create([
        {
            user:fromUserId,
            transaction: transaction._id,
            category: "TRANSACTION",
            type: "MONEY_DEBITED",
            title: `Money Sent to ${toUserName}`,
            message: `${formatAmount(amount)} debited from ${fromAccount.accountName}`,
            amount
        },
        {
            user: toUserId,
            transaction: transaction._id,
            category: "TRANSACTION",
            type: "MONEY_CREDITED",
            title: `Money recived from ${fromUserName}`,
            message: `${formatAmount(amount)} credit to ${toAccount.accountName}`
        }
    ])
}

const createFailedTransferNotification = async ({transaction, fromAccount, reason}) =>{
    return notificationModel.create({
        user: fromAccount.user,
        transaction: transaction._id,
        category: "TRANSACTION",
        type: "TRANSFER_FAILED",
        title: "Transfer unsuccessful",
        message: reason || `${formatAmount(transaction.amount)} transfer from ${fromAccount.accountName} could not be completed`,
        amount: transaction.amount
    })

}

const createCreditTransferNotification = ({transaction, account}) =>{
    return notificationModel.create({
        user: account.user,
        transaction: transaction._id,
        category: "TRANSACTION",
        type: "MONEY_CREDITED",
        title: "Money received from Bank",
        message: `${formatAmount(transaction.amount)} credited to ${account.accountName}`,
        amount: transaction.amount

    })
}

const createNewUserNotification = async (userId) => {
    const name = await getUserName(userId)
    return notificationModel.create({
        user: userId,
        category: "ACCOUNT",
        type: "ACCOUNT_CREATED",
        title: "Welcome to NovaBank!",
        message: `Hello ${name}, welcome to our digital banking platform!`
    })
}

module.exports = {createCompletedTransferNotification, createFailedTransferNotification, createCreditTransferNotification, createNewUserNotification}
