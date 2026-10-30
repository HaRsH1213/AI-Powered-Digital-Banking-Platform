const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/accounts.model")
const mongoose = require("mongoose")
const emailService = require("../services/email.service")
const userModel = require("../models/user.model")
const getIndianTimeZone = require("../utils/indianTimeZone")
const notificationService = require("../services/notification.service")

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
    * 1. Validate request
    * 2. Validate idempotency key
    * 3. Check account status
    * 4. Derive sender balance from ledger
    * 5. Create transaction (PENDING)
    * 6. Create DEBIT ledger entry
    * 7. Create CREDIT ledger entry
    * 8. Mark transaction COMPLETED
    * 9. Commit MongoDB session
    * 10. Send email notification
 */

async function createTransaction (req, res){
    const {fromAccount, toAccount, amount} = req.body
    const idempotencyKey = req.get("idempotencyKey") || req.body.idempotencyKey 

    /**
     *1. Validate request
     */
    
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message: "FromAccount , toAccount, amount, IdemptencyKey are required"
        })

    }
    const fromUserAccount = await accountModel.findOne({
        accountNumber: fromAccount,
        user: req.user._id
    })
    const toUserAccount = await accountModel.findOne({
        accountNumber: toAccount
    })

    if (!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    /**
     *2. Validate idempotency key
     */

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })
    if(isTransactionAlreadyExists){
        const sameDetails =
            isTransactionAlreadyExists.fromAccount.toString() === fromUserAccount._id.toString() &&
            isTransactionAlreadyExists.toAccount.toString() === toUserAccount._id.toString() &&
            Number(isTransactionAlreadyExists.amount) === Number(amount)
            
        if(!sameDetails){
            return res.status(409).json({
                message: "Idempotency key was already used with different transaction details",
        }) 
        }
        if(isTransactionAlreadyExists.status === "COMPLETED"){
        return res.status(200).json({
            message: "Transaction already processed",
            transaction: isTransactionAlreadyExists
        })
        }
        if(isTransactionAlreadyExists.status === "PENDING"){
        return res.status(200).json({
            message: "Transaction is still processing"
    
        })
        }
        if(isTransactionAlreadyExists.status === "FAILED"){
        return res.status(500).json({
            message: "Transaction Falied please try again later",
            transaction: isTransactionAlreadyExists
        })
        }
        if(isTransactionAlreadyExists.status === "REVERSED"){
        return res.status(500).json({
            message: "Transaction was reversed, please try again later",
        })
        }
        if (isTransactionAlreadyExists.status === "REJECTED") {
        return res.status(400).json({
            message: "Transfer was rejected due to insufficient balance",
            transaction: isTransactionAlreadyExists
        })
}
    }

     /**
     *3. Check account status
     */

    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be in Active Status"
        })
    }
    
    
    /**
    *4. Derive sender balance from ledger entry
    */


    const userBalance = await fromUserAccount.getBalance()
    if (userBalance < amount) {
        const failedTransaction = await transactionModel.create({
            fromAccount: fromUserAccount._id,
            toAccount: toUserAccount._id,
            amount,
            idempotencyKey,
            status: "REJECTED"
        })

        try {
            await notificationService.createFailedTransferNotification({
                fromAccount: fromUserAccount,
                transaction: failedTransaction,
                reason : `Transfer of ₹${Number(amount).toLocaleString('en-IN')} from ${fromUserAccount.accountName} was declined due to insufficient balance`
            })
            
        } catch (notificationError) {
            console.error("Unable to create rejected-transfer notification", notificationError)

            
        }

        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${userBalance} and requested amount is ${amount}`,
            transaction: failedTransaction
        })
    }


    /**
    *4. Transaction Steps
    */

    // 1. Create PENDING transaction
    const transactionResult = await transactionModel.create([{
        fromAccount: fromUserAccount._id,
        toAccount: toUserAccount._id,
        amount,
        idempotencyKey,
        status: "PENDING"
    }])

    const transaction = transactionResult[0]


    // 3. Start atomic money movement
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        // DEBIT
        await ledgerModel.create([{
            account: fromUserAccount._id,
            amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], { session })


        // Simulate processing delay

        // await new Promise((resolve) => {
        //     setTimeout(resolve, 10000)
        // })

        // CREDIT
        await ledgerModel.create([{
            account: toUserAccount._id,
            amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], { session })

        // COMPLETED
        transaction.status = "COMPLETED"
        await transaction.save({ session })

        await session.commitTransaction()

    } catch (error) {

        await session.abortTransaction()

        transaction.status = "FAILED"
        await transaction.save()
        try {
            await notificationService.createFailedTransferNotification({
                transaction,
                fromAccount: fromUserAccount
            })
        } catch (notificationError) {
            console.error("Unable to create failed-transfer notification", notificationError)
        }
        return res.status(500).json({
            message: "Transaction failed",
            transaction
        })

    } finally {
        await session.endSession()
    }

    try {
        await notificationService.createCompletedTransferNotification({
            transaction: transaction,
            fromAccount: fromUserAccount,
            toAccount: toUserAccount
        })
        } catch (notificationError) {
            console.error("Unable to create completed-transfer notifications", notificationError)
            
        }


    /**
     *10. Send email notification
     */

    await emailService.sendTransactionSuccessEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })

}

async function createInitialTransaction(req, res){
    const { toAccount, amount } = req.body
    const idempotencyKey = req.get("Idempotency-Key") || req.get("idempotencyKey") || req.body.idempotencyKey
    const numericAmount = Number(amount)

    if (!toAccount || !idempotencyKey || !Number.isFinite(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({
            message: "A destination account, a positive amount, and an idempotency key are required"
        })
    }

    const [toUserAccount, fromSystemAccount] = await Promise.all([
        accountModel.findOne({ accountNumber: String(toAccount) }),
        accountModel.findOne({ user: req.user._id, status: "ACTIVE" }).sort({ createdAt: 1 })
    ])

    if (!toUserAccount) {
        return res.status(400).json({ message: "The destination account was not found" })
    }

    if (!fromSystemAccount) {
        return res.status(409).json({ message: "No active system funding account is available" })
    }

    if (toUserAccount.user.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "Initial funds can only be sent to a customer account" })
    }

    if (toUserAccount.status !== "ACTIVE") {
        return res.status(409).json({ message: "Initial funds can only be added to an active account" })
    }

    const existingTransaction = await transactionModel.findOne({ idempotencyKey })
    if (existingTransaction) {
        const sameDetails =
            existingTransaction.fromAccount.toString() === fromSystemAccount._id.toString() &&
            existingTransaction.toAccount.toString() === toUserAccount._id.toString() &&
            Number(existingTransaction.amount) === numericAmount

        if (!sameDetails) {
            return res.status(409).json({
                message: "This idempotency key was already used with different funding details"
            })
        }

        return res.status(200).json({
            message: existingTransaction.status === "COMPLETED" ? "Initial funding was already processed" : "Initial funding is still processing",
            transaction: existingTransaction
        })
    }

    /**
     * 5. Create PENDING transaction
     */

    const transactionResult = await transactionModel.create([{
        fromAccount: fromSystemAccount._id,
        toAccount: toUserAccount._id,
        amount: numericAmount,
        idempotencyKey,
        status: "PENDING"
    }])

    const transaction = transactionResult[0]

    /**
     * 6. Start atomic money movement
     */

    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        /**
         * 7. DEBIT system account
         */

        await ledgerModel.create([{
            account: fromSystemAccount._id,
            amount: numericAmount,
            transaction: transaction._id,
            type: "DEBIT"
        }], { session })

        /**
         * 8. CREDIT customer account
         */

        await ledgerModel.create([{
            account: toUserAccount._id,
            amount: numericAmount,
            transaction: transaction._id,
            type: "CREDIT"
        }], { session })

        /**
         * 9. Mark transaction COMPLETED
         */

        transaction.status = "COMPLETED"

        await transaction.save({ session })

        /**
         * 10. Commit transaction
         */

        await session.commitTransaction()

    } catch (error) {

        if (session.inTransaction()) {
            await session.abortTransaction()
        }

        transaction.status = "FAILED"
        await transaction.save()

        console.error("Unable to create initial transaction", error)

        return res.status(500).json({
            message: "Initial transaction failed",
            transaction
        })

    } finally {
        await session.endSession()
    }

    /**
     * 11. Send credit notification
     */

    try {
        await notificationService.createCreditTransferNotification({
            transaction,
            account: toUserAccount
        })

    } catch (notificationError) {
        console.error(
            "Unable to create initial-funds notification",
            notificationError
        )
    }

    /**
     * 12. Send response
     */

    return res.status(201).json({
        message: "Initial transaction completed successfully",
        transaction
    })
}


async function fetchTransactions(req, res) {
    const user = req.user
    
    try {
        const userAccounts = await accountModel.find({user: user._id}).select("_id")
        const accountsIds =  userAccounts.map((account) => account._id)

        const transactions = await transactionModel.find({
            $or: [
                // Sender can see every status: completed, rejected, failed, etc.
                {
                fromAccount: { $in: accountsIds }
                },

                // Receiver can see only successfully completed transfers
                {
                toAccount: { $in: accountsIds },
                status: "COMPLETED"
                }
            ]
        })
        .populate({
            path : "fromAccount",
            select : "accountName accountNumber user",
            populate : {
                path : "user",
                select : "name"
            }
        })
        .populate({
            path : "toAccount",
            select : "accountName accountNumber user",
            populate : {
                path : "user",
                select : "name"
            }
        })
        .sort({createdAt : -1})
        
        const transactionData = transactions.map((transaction)=>({

            id : transaction._id,
            status: transaction.status,
            amount : transaction.amount,
            direction : transaction.fromAccount.user._id.toString() === user._id.toString() ? "OUTGOING" : "INCOMING",
            dateTime : getIndianTimeZone(transaction.createdAt),
            month : getIndianTimeZone(transaction.createdAt).split(" ")[1],

            from : {
                accountName : transaction.fromAccount.accountName,
                accountNumber : transaction.fromAccount.accountNumber,
                holderName : transaction.fromAccount.user.name
            },
            to : {
                accountName : transaction.toAccount.accountName,
                accountNumber : transaction.toAccount.accountNumber,
                holderName : transaction.toAccount.user.name
            }
        }))

        return res.status(200).json({
            message: "Transaction Fetched Successfully",
            transactions : transactionData
        })
    } catch (error) {
        console.log("Error while fetching transactions", error)
        return res.status(500).json({
            message: "Unable to fetch transactions",
        })
        
    }


    
}
module.exports = {createTransaction, createInitialTransaction, fetchTransactions}
