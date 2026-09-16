const accountModel = require("../models/accounts.model")
const userModel = require("../models/user.model")

/**
 * Fetch receiver's name using account number
 */
async function getReceiverName(req, res) {
    try {
        const { accountNumber } = req.params

        // 1. Find account
        const account = await accountModel.findOne({ accountNumber })

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            })
        }

        // 2. Find account owner
        const user = await userModel.findById(account.user)

        if (!user) {
            return res.status(404).json({
                message: "User associated with this account not found"
            })
        }

        // 3. Return receiver details
        return res.status(200).json({
            message: "Account's User Details",
            user: {
                accountNumber: account.accountNumber,
                name: user.name
            }
        })

    } catch (error) {
        console.error("Error fetching receiver details:", error)

        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = getReceiverName