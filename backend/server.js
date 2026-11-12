require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/db")

const PORT = process.env.PORT || 3000
connectToDB()

app.listen(PORT, "0.0.0.0" ,()=>{
    console.log(`Server running at port ${PORT}`);
    
})