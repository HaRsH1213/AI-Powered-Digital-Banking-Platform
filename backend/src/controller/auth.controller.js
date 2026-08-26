const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")

const tokenBlacklistModel = require("../models/blacklist.model")
/**
 * - User register Controller
 * - POST /api/auth/register
 */
async function registerUserController (req, res){
    const {email,name,password} =  req.body
    const isEmailExists = await userModel.findOne({
        email:email
    })
    if(isEmailExists){
        return res.status(422).json({
            message: "User Already Exists with this Email ",
            status : 'failed'
        })
    }

    const user = await userModel.create({
        email, name, password
    })

    const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:"3d"})
    res.cookie('token', token)

    res.status(201).json({
        message: "User Registered Successfully",
        user :{
            _id : user._id,
            name: user.name,
            email: user.email

        },
        token
    })
    await emailService.sendRegistrationEmail(user.email, user.name)



}
/**
 * - User Login Controller
 * - POST /api/auth/Login
 */

async function loginUserController(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({email:email}).select("+password")

    if(!user){
        return res.status(401).json({
            message: "Invalid Email or Password"
        })
    }
    const isCorrectPassword = await user.comparePassword(password)

    if(!isCorrectPassword){
        return res.status(401).json({
            message: "Invalid Email or Password"
        })
    }
    const token = await jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)
    res.status(200).json({
        message: "User Login Successfully",
        user :{
            _id : user._id,
            name: user.name,
            email: user.email

        },
        token
    })
}


/**
 * - User Logout Controller
 * - POST /api/auth/logout
 */

async function userLogoutController(req, res){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(200).json({
            message: "User Logout Successfully "
        })
    }
    
    try {
        
        await tokenBlacklistModel.create({
            token
        })

        res.clearCookie("token")

        return res.status(200).json({
            message: "User Logout Successfully"
        })

    } catch (error) {
        console.error("Logout Error:", error)

        return res.status(500).json({
            message: "Logout failed"
        })
    }
}

module.exports = {registerUserController, loginUserController, userLogoutController}