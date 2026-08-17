const mongoose = require("mongoose")
const dns = require("dns")

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"

])


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Server is Connected to DataBase ");
            
        })
        .catch(err=>{
            console.log("Error while Connecting top DB ",err);
            process.exit(1)
            

        })
}

module.exports = connectToDB