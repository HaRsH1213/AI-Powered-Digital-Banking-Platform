const accountModel = require("../models/accounts.model")
const generateAccountNumber  = require("../utils/accountNumber")


async function createAccountController(req, res){

    const user = req.user
    const {accountName, accountType, } = req.body

    let accountNumber
    let isAccountExists = true
    while(isAccountExists){
        accountNumber = generateAccountNumber()
        isAccountExists = await accountModel.exists({accountNumber})
    }
    const account = await accountModel.create({
        user: user._id,
        accountNumber,
        accountName,
        accountType
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
async function getTotalBalanceController(req, res) {

    const accounts = await accountModel.find({
        user: req.user._id,
    })

    const balances = await Promise.all(
        accounts.map((account)=> account.getBalance())
    )
    const totalBalance =  balances.reduce(
        (total, balance)=> total + balance, 0)

    return res.status(200).json({
        message: "Total balance fetched",
        totalBalance,
    })
}

module.exports = {createAccountController, getUserAccountsController, getAccountBalanceController, getTotalBalanceController}