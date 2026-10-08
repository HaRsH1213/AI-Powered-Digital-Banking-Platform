const accountModel = require("../models/accounts.model")
const ledgerModel = require("../models/ledger.model")
const transactionModel = require("../models/transaction.model")
const userModel = require("../models/user.model")

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
                isVerified: false
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

        const maskAccountNumber = (value) => value
            ? `•••• ${String(value).slice(-4)}`
            : "Unavailable"
        
        return res.status(200).json({
            message: "Admin overview loaded Successfully",
            overview: {
                totalCustomer: customerUsers.length,
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

module.exports = { getAdminOverviewController }
