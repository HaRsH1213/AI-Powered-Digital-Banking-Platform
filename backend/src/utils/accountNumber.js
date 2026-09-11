const crypto = require("crypto")


const generateAccountNumber = ()=>{
    return crypto.randomInt(
        100000000000,
        1000000000000
    ).toString()

}

module.exports = generateAccountNumber