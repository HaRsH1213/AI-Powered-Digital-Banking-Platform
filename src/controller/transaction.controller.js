const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/accounts.model")
const mongoose = require("mongoose")
const emailService = require("../services/email.service")

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
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body

    /**
     *1. Validate request
     */
    
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            message: "FromAccount , toAccount, amount, IdemptencyKey are required"
        })

    }
    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })
    const toUserAccount = await accountModel.find({
        _id: toAccount
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
        if(isTransactionAlreadyExists.status === "Failed"){
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
    *4. Derive sender balance from ledger
    */


    const userBalance = await accountModel.getBalance()
    if(balance < amount){
    return res.status(400).json({
        message: `Insufficient balance. Current balance is ${balance} and Requested Amount is ${amount} `
    })
    }


    /**
    *4. Derive sender balance from ledger
    */

    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    },{session})
    const debitLedger = await ledgerModel.create({
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    },{session})
    const creditLedger = await ledgerModel.create({
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    },{session})


    transaction.status = "COMPLETED"
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()


    /**
     *10. Send email notification
     */

    await emailService.sendTransactionSuccessEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })

}
module.exports = {createTransaction}