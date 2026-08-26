const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")


async function authMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing"

        })

    }
    const isBlackListed = await tokenBlacklistModel.findOne({
        token: token
    })
    if(isBlackListed){
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userId)
        req.user = user
        return next()

    }catch(err){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })

    }
}

async function authSystemUserMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing"

        })

    }
    const isBlackListed = await tokenBlacklistModel.findOne({
        token: token
    })
    if(isBlackListed){
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded);
        
        const user = await userModel.findById(decoded.userId).select("+systemUser")
        // console.log(user);
        

        
        if(!user.systemUser){
            return res.status(403).json({
                message: "Forbidden Access, not a system user"
            })
        }

        req.user = user
        return next()

    } catch(err){
        return res.status(401).json({
            message: "Unauthorized access, token is missing p"
        })

    }

}

module.exports = {authMiddleware, authSystemUserMiddleware}