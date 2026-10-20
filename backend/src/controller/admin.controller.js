const accountModel = require("../models/accounts.model")
const ledgerModel = require("../models/ledger.model")
const transactionModel = require("../models/transaction.model")
const userModel = require("../models/user.model")
const mongoose = require("mongoose")

const maskAccountNumber = (value) => value
    ? `•••• ${String(value).slice(-4)}`
    : "Unavailable"

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

async function getAdminOverviewController(req, res) {
    try {
        const customerUsers = await userModel.find({systemUser:{$ne: true}}).select("_id")
        const customerUsersIds = customerUsers.map((customerUser) => customerUser._id)
        const customerAccounts = await accountModel.find({user: {$in: customerUsersIds}}).select("_id accountName accountNumber status")
        const customerAccountIds = customerAccounts.map((customerAccount) => customerAccount._id)

        const [activeAccounts, unverifiedCustomers, totalBalance] = await Promise.all([
            accountModel.countDocuments({
                user: {$in: customerUsersIds},
                status: "ACTIVE"
            }),
            userModel.countDocuments({
                systemUser: {$ne: true},
                isVerified: {$ne: true}
            }),

            customerAccountIds.length
                ? ledgerModel.aggregate([
                    {$match : {
                        account: {$in: customerAccountIds}
                    }},
                    {
                        $group : {
                            _id: "$account",
                            credits:{
                                $sum: {
                                    $cond: [{$eq: ["$type", "CREDIT"]}, "$amount", 0]
                                }
                            },

                            debits: {
                                $sum: {
                                    $cond: [{$eq: ["$type", "DEBIT"]}, "$amount", 0]
                                }
                            }
                        }
                    },
                    {$project : {
                        balance : {$subtract: ["$credits" , "$debits"]}
                    }}

                    ])
                : Promise.resolve([])

        ])
        const last24hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const [successTransLast24H, rejectedTransLast24H, recentTransactions] = await Promise.all([
            transactionModel.countDocuments({status: "COMPLETED", createdAt: {$gte: last24hours }}),
            transactionModel.countDocuments({status: {$in: ["FAILED", "REJECTED"]}, createdAt: {$gte: last24hours}} ),
            transactionModel.find()
                .sort({createdAt: -1})
                .limit(8)
                .populate({
                    path: "fromAccount",
                    select: "accountName accountNumber user",
                    populate: {
                        path: "user",
                        select: "name"
                    }
                })
                .populate({
                    path: "toAccount",
                    select: "accountName accountNumber user",
                    populate: {
                        path: "user",
                        select: "name"
                    }
                })
                .lean()
            
        ])

        return res.status(200).json({
            message: "Admin overview loaded Successfully",
            overview: {
                totalCustomers: customerUsers.length,
                unverifiedCustomers,
                activeAccounts,
                totalCustomerBalance: totalBalance.reduce((total, row) => total + (row.balance || 0), 0),
                successTransLast24H,
                rejectedTransLast24H,
                recentTransactions: recentTransactions.map((transaction) => ({
                    id: transaction._id,
                    status: transaction.status,
                    amount: transaction.amount,
                    createdAt: transaction.createdAt,
                    from: {
                        name: transaction.fromAccount?.user?.name || "Unavailable",
                        accountName: transaction.fromAccount?.accountName || "Unavailable",
                        accountNumber: maskAccountNumber(transaction.fromAccount?.accountNumber)
                    },
                    to: {
                        name: transaction.toAccount?.user?.name || "Unavailable",
                        accountName: transaction.toAccount?.accountName || "Unavailable",
                        accountNumber: maskAccountNumber(transaction.toAccount?.accountNumber)
                    }
                }))
            }

        })
    } catch (error) {
        console.error("Unable to load admin overview", error)
        return res.status(500).json({ message: "Unable to load admin overview" })
    }
}

async function getCustomersController(req, res) {
    try {
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1)
        const pageSize = 10
        const search = String(req.query.search || "").trim().slice(0, 100)
        const verification = req.query.verification
        const filter = {systemUser: {$ne : true}}


        if (verification === "verified") filter.isVerified = true
        if (verification === "unverified") filter.isVerified = {$ne: true}
        if(search){
            const safeSearch = escapeRegex(search)
            filter.$or = [
                {name: {$regex: safeSearch, $options: 'i'}},
                {email: {$regex: safeSearch, $options: 'i'}}
            ]
        }

        const [customers, total] = await Promise.all([
            userModel.find(filter)
                .select("name email isVerified createdAt")
                .sort({createdAt: -1, _id: -1})
                .limit(pageSize)
                .skip((page - 1) * pageSize)
                .lean(),
            userModel.countDocuments(filter)
        ])

        const customerIds = customers.map((customer)=> customer._id)

        const accountCounts = customerIds.length
            ?
                await accountModel.aggregate([
                    {$match: {user: {$in: customerIds}}},
                    {$group: {_id: "$user", accountCount:{$sum: 1}}}
                ])
            : []

        const accountsCountByCustomer = new Map(accountCounts.map((item)=>[String(item._id), item.accountCount]))
        return res.status(200).json({
            message: "Customers loaded successfully",
            customers: customers.map((customer)=>({
                id: customer._id,
                name: customer.name,
                email: customer.email,
                isVerified: customer.isVerified,
                createdAt: customer.createdAt,
                accountsCount: accountsCountByCustomer.get(String(customer._id)) || 0

            })),
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        })
    } catch (error) {
        console.error("Unable to load customers", error)
        return res.status(500).json({ message: "Unable to load customers" })
    }
}

async function getCustomerDetailsController(req, res) {
    try {
        const {customerId} = req.params
        const customer = await userModel.findOne({
            _id: customerId,
            systemUser: {$ne: true}
        }).select("name email isVerified createdAt")

        const accounts = await accountModel.find({user:customer._id}).select("accountName accountType accountKind accountNumber status ifscCode currency createdAt").lean()


        // This is all for Get Calculate Balance of Account
        const accountIds = accounts.map((account)=> account._id)
        const accountBalance = accountIds.length
            ? await ledgerModel.aggregate([
                {$match : {account :{$in: accountIds}}},
                {$group : {
                    _id: "$account", 
                    credits: {$sum:{$cond: [{$eq: ["$type", "CREDIT"]}, "$amount", 0]}},
                    debits: {$sum: {$cond: [{$eq: ["$type", "DEBIT"]}, "$amount", 0]}}
                    }
                },
                {$project: {balance: {$subtract: ["$credits", "$debits"]}}}
            ])
            : []

        const balanceByAccount = new Map(accountBalance.map((item)=> [String(item._id), item.balance]))
        const accountDetails = accounts.map((account)=>({
            id: account._id,
            name: account.accountName,
            type: account.accountType,
            kind: account.accountKind,
            accountNumber: account.accountNumber,
            ifscCode: account.ifscCode,
            currency: account.currency,
            status: account.status,
            balance: balanceByAccount.get(String(account._id)) || 0,
            createdAt: account.createdAt

        }))
        
        return res.status(200).json({
            message: "Customer details loaded successfully",
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                isVerified: customer.isVerified,
                createdAt: customer.createdAt,
                accounts: accountDetails,
                totalBalance: accountDetails.reduce((total, account)=> total+ account.balance, 0)
            }

        })
    } catch (error) {
        console.error("Unable to load customer details", error)
        return res.status(500).json({ message: "Unable to load customer details" })
    }
}

module.exports = { getAdminOverviewController, getCustomersController, getCustomerDetailsController }
