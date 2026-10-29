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

async function getAdminAccountsController(req, res) {
    try {
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1)
        const pageSize = 10
        const search = String(req.query.search || "").trim().slice(0, 100)
        const status = String(req.query.status || "all").toUpperCase()
        const supportedStatuses = ["ALL", "ACTIVE", "FROZEN", "CLOSED"]
        
        if (!supportedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid account status filter" })
        }
        const filter = { user:{$nin: await userModel.find({systemUser : true}).distinct("_id") }}

        if (status !== "ALL") {
            filter.status = status
        }

        if(search){
            const safeSearch = escapeRegex(search)
            const matchingCustomerIds = await userModel.find({
                systemUser : {$ne: true},
                $or : [
                    {name: {$regex: safeSearch, $options: "i"}},
                    {email: {$regex: safeSearch, $options: "i"}}
                ]
            
            }).distinct("_id")

            filter.$or = [
                {accountName: {$regex: safeSearch, $options: "i"}},
                {accountNumber: {$regex: safeSearch, $options: "i"}},
                {user: {$in: matchingCustomerIds}}
            ]
        }


        const [accounts, total] = await Promise.all([
            accountModel.find(filter).select("user accountName accountType accountKind accountNumber ifscCode currency status createdAt")
            .populate({
                path:"user", 
                select: "name email"
            })
            .sort({createdAt: -1, _id: -1})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .lean(),
            accountModel.countDocuments(filter)
        ])
        const accountIds = accounts.map((account) => account._id)

        const balance = accountIds.length 
            ? await ledgerModel.aggregate([
                {$match : {account : {$in : accountIds}}},
                {
                    $group:{
                        _id: "$account",
                        credit: {$sum: {$cond: [{$eq: ["$type", "CREDIT"]}, "$amount", 0]}},
                        debit: {$sum: {$cond: [{$eq: ["$type", "DEBIT"]}, "$amount", 0]}}
                    }
                },
                {$project: {balance: {$subtract : ["$credit", "$debit"]} } }
            ])
            : []
        const balanceByAccount = new Map(balance.map((item) => [String(item._id), item.balance]))
        return res.status(200).json({
            message: "Accounts loaded successfully",
            accounts: accounts.map((account) =>({
                id: account._id,
                name: account.accountName,
                type: account.accountType,
                kind: account.accountKind,
                accountNumber: account.accountNumber,
                ifscCode: account.ifscCode,
                currency: account.currency,
                status: account.status,
                balance: balanceByAccount.get(String(account._id)) || 0,
                createdAt: account.createdAt,
                customer: {
                    name: account.user?.name || "Unavailable",
                    email: account.user?.email || "Unavailable" 
                }
            })),

            pagination:{
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)

            }
        })
    } catch (error) {
        console.error("Unable to load admin accounts", error)
        return res.status(500).json({ message: "Unable to load accounts" })
    }
}

async function updateAdminAccountStatusController(req, res) {
    try {
        const {accountId} = req.params
        const {status} = req.body

        if (!mongoose.isValidObjectId(accountId)) {
            return res.status(400).json({ message: "Invalid account ID" })

        }

        const currentAccount = await accountModel.findById(accountId).select("status")
        if (currentAccount.status === "CLOSED") {
            return res.status(409).json({ message: "Closed accounts cannot be reactivated or frozen" })
        }
        const account = await accountModel.findOneAndUpdate(
            {_id : accountId, status: {$in : ["ACTIVE", "FROZEN"] }},
            {$set: {status}},
            { new: true, runValidators: true }
        ).select("_id status")
        
        if (!account) {
            return res.status(409).json({ message: "Account status changed. Refresh and try again." })
        }
        return res.status(200).json({
            message: `Account ${status === "FROZEN" ? "frozen" : "activated"} successfully`,
            account: { id: account._id, status: account.status }
        })
    } catch (error) {
        console.error("Unable to update account status", error)
        return res.status(500).json({ message: "Unable to update account status" })
        
    }
    
    
}

module.exports = {
    getAdminOverviewController,
    getCustomersController,
    getCustomerDetailsController,
    getAdminAccountsController,
    updateAdminAccountStatusController
}
