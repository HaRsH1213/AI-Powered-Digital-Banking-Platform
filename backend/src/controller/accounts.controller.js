const accountModel = require("../models/accounts.model")


async function createAccountController(req, res){

    const user = req.user
    const account = await accountModel.create({
        user: user._id
    })
    res.status(201).json({
        message: "Account created",
        account
    })

} 

async function getUserAccountsController(req, res){
    const accounts = await accountModel.find({user:req.user._id})

    return res.status(200).json({
        message: "Your Accounts:",
        accounts
    })
}

async function getAccountBalanceController(req, res){
    const {accountId} = req.params
    // console.log(accountId);
    // console.log(req.user._id);
    
    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })
    if(!account ){
        return res.status(404).json({
            message: "Account not found"
        })

    }

    const accountBalance = await account.getBalance()
    return res.status(200).json({
        message: "Your Current balance:",
        balance: accountBalance
    })
}

module.exports = {createAccountController, getUserAccountsController, getAccountBalanceController}