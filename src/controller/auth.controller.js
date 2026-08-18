const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
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

    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"3d"})
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
    const token = await jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

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

module.exports = {registerUserController, loginUserController}