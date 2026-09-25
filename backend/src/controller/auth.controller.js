const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const crypto = require("crypto")

const tokenBlacklistModel = require("../models/blacklist.model")
/**
 * - User register Controller
 * - POST /api/auth/register
 */
async function registerUserController (req, res){
    const {email,name,password} =  req.body
    const isUserExists = await userModel.findOne({
        email:email
    })
    if(isUserExists && isUserExists.isVerified){
        return res.status(422).json({
            message: "You Are Already Registered and Verified with this Email, Please Login ",
            status : 'failed'
        })
    }

    if(isUserExists && !isUserExists.isVerified){
        const otp = crypto.randomInt(100000, 1000000).toString() // Generate a random 6-digit OTP
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)
        isUserExists.emailVerificationOtpHash = otp
        isUserExists.emailVerificationOtpExpiresAt = otpExpiresAt
        await isUserExists.save()
        await emailService.sendEmailVerificationOtpEmail(isUserExists.email, isUserExists.name, otp)
        res.cookie("verificationEmail", isUserExists.email, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 60 * 1000
        })
        return res.status(200).json({
            message: "User Registered Successfully.Please Verify Your Email now",
            user : {
                _id : isUserExists._id,
                name : isUserExists.name,
                email : isUserExists.email
            }
        })
    }

    const otp = crypto.randomInt(100000, 1000000).toString() // Generate a random 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)

    const user = await userModel.create({
        email, name, password,
        emailVerificationOtpHash: otp,
        emailVerificationOtpExpiresAt: otpExpiresAt
    })
    await emailService.sendEmailVerificationOtpEmail(user.email, user.name, otp)

    // const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:"3d"})
    res.cookie("verificationEmail", user.email, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 * 1000
    })

    res.status(201).json({
        message: "User Registered Successfully",
        user :{
            _id : user._id,
            name: user.name,
            email: user.email

        },
    })



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

async function getCurrentUserController(req, res){
    const user = req.user
    return res.status(200).json({
        message: "Current Logged-In User Data",
        user: {
            _id : user._id,
            name : user.name,
            email : user.email
        }
    })

}


async function verifyEmailOtpController(req, res){
    const {otp} = req.body
    const email = req.cookies.verificationEmail
    
    if (!email) {
        return res.status(400).json({
            message: "Verification session expired. Please register again."
        })
    }

    const user = await userModel.findOne({email}).select("+emailVerificationOtpHash +emailVerificationOtpExpiresAt")

    if(!user){
        return res.status(401).json({
            message: "User not found"
        })
    }


    // Check OTP expiry
    if(!user.emailVerificationOtpExpiresAt || user.emailVerificationOtpExpiresAt < new Date()){
        return res.status(400).json({
            message: "OTP has expired"
        })
    }

    // Compare OTP 
    const isCorrectOtp  = await user.compareOtp(otp)

    if(!isCorrectOtp){
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }

    // If OTP is Correct
    user.isVerified = true
    user.emailVerificationOtpHash = undefined
    user.emailVerificationOtpExpiresAt = undefined
    await user.save()

    // Send registration completion email
    await emailService.sendRegistrationEmail(user.email, user.name)


    // Clear the verification email cookie
    res.clearCookie("verificationEmail")


    return res.status(200).json({
        message: "Email verified Successfully"
    })
}
async function resendOtpController(req, res){
    const email = req.cookies.verificationEmail

    if (!email) {
        return res.status(400).json({
            message: "Verification session expired. Please register again."
        })
    }

    const user = await userModel.findOne({email})
    
    if (!user) {
        return res.status(400).json({
            message: "Verification session expired. Please register again."
        })
    }

    if (user.isVerified) {
        return res.status(400).json({
            message: "Email is already verified. Please log in."
        })
    }

    const otp = crypto.randomInt(100000, 1000000).toString()
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)

    user.emailVerificationOtpHash = otp
    user.emailVerificationOtpExpiresAt = otpExpiresAt
    await user.save()

    await emailService.sendEmailVerificationOtpEmail(user.email, user.name, otp)

    return res.status(200).json({
        message: "Otp Resend Successfully"
    })

}

module.exports = {registerUserController, loginUserController, userLogoutController, getCurrentUserController, verifyEmailOtpController, resendOtpController}