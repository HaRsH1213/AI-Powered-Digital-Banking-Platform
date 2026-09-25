const mongoose = require("mongoose") 
const bcrypt = require("bcryptjs")
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true, "Email is Required to creating a account"],
        trim : true,
        lowercase : true,
        match : [emailRegex,'Please provide a valid email address'],
        unique : [true, "Email already Exists"]

    },
    name :{
        type : String,
        required : [true, "Name is Required to creating a account"]

    },
    password : {
        type : String,
        required : [true, "Password is Required to create a Account"],
        minlength : [6, "Password length should be greater than 6 "],
        select: false,

    },
    systemUser:{
        type: Boolean,
        default: false,
        immutable: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationOtpHash: {
        type: String,
        select: false
    },

    emailVerificationOtpExpiresAt: {
        type: Date,
        select: false
    }


}, {
    timestamps : true
}
)

userSchema.pre("save",async function () {
    if(!this.isModified("password")){
        return 
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return 

})
userSchema.pre("save", async function(){
    if(
        !this.isModified("emailVerificationOtpHash") ||
        !this.emailVerificationOtpHash
    ){
        return 
    }
    const otpHash = await bcrypt.hash(this.emailVerificationOtpHash,10)
    this.emailVerificationOtpHash = otpHash
    return 

})


userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password)
    
}

userSchema.methods.compareOtp = async function (otp){
    return await bcrypt.compare(otp, this.emailVerificationOtpHash)

}


const userModel = mongoose.model("user", userSchema)


module.exports = userModel