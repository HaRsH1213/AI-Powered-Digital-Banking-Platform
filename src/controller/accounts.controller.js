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

module.exports = {createAccountController}