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

    }
}, {
    timestamps : true
}
)

userSchema.pre("save",async function () {
    this.isModified()
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return 

})


userSchema.methods.comparePassword = async (password) => {

    return await bcrypt.compare(password, this.password)
    
}


const userModel = mongoose.model("user", userSchema)


module.exports = userModel