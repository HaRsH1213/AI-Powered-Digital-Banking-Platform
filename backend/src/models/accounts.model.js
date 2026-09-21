const mongoose = require("mongoose")
const ledgerModel = require("../models/ledger.model")

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:[true, "Account must be associated with a user"],
        index: true

    },
    accountName:{
        type: String,
        required: [true,"Account's name is Required to creating a account"]
        
    },
    accountType:{
        type: String,
        enum :{
            values: ["Savings", "Current"],
            message: "AccountType can be either  Saving  or Current"
        },
        default : "Savings"
    },
    accountKind:{
        type: String,
        enum :{
            values: ["Savings", "Salary", "Emergency"],
            message: "AccountKind can be either  Savings, Salary or Emergency"
        },
        default : "Savings"
    },
    ifscCode: {
        type: String,
        required: true,
        immutable: true
    },
    accountNumber:{
        type: String,
        required: true,
        unique: true,
        immutable: true

    },
    status:{
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either  ACTIVE, FROZEN or CLOSED"
            
        },
        default: "ACTIVE"
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        default: "INR"
    }
},{
    timestamps: true
})

accountSchema.index({user:1, status:1})

accountSchema.methods.getBalance = async function(){
    const balanceData = await ledgerModel.aggregate([
        {$match: {account: this._id}},
        {
            $group:{
                _id: null,
                totalDebit:{
                    $sum:{
                        $cond: [
                            {$eq:["$type", "DEBIT"]},
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit:{
                    $sum: {
                        $cond:[
                        {$eq: ["$type", "CREDIT"]},
                            "$amount",
                            0
                        ]
                    }
                    
                }
            }
        },
        {
            $project:{
                _id: 0,
                balance: {$subtract: ["$totalCredit", "$totalDebit"]}
            }
        }
    ])

    if(balanceData.length ==0){
        return 0
    }

    return balanceData[0].balance

}


const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel