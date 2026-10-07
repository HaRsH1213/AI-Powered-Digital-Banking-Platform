const accountModel = require("../models/accounts.model")
const ledgerModel = require("../models/ledger.model")
const transactionModel = require("../models/transaction.model")
const userModel = require("../models/user.model")

async function getAdminOverviewController(req, res) {
    try {
        const customerUsers = await userModel.find({ systemUser: { $ne: true } }).select("_id")
        const customerIds = customerUsers.map((user) => user._id)
        const customerAccounts = await accountModel.find({ user: { $in: customerIds } })
            .select("_id accountName accountNumber status")
        const customerAccountIds = customerAccounts.map((account) => account._id)
    } catch (error) {
        console.error("Unable to load admin overview", error)
        return res.status(500).json({ message: "Unable to load admin overview" })
    }
}

module.exports = { getAdminOverviewController }
