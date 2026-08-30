const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

/**
 * - Routes Required
 */

const accountRouter = require("./routes/account.routes")
const authRouter = require("./routes/auth.routes")
const transactionRouter = require("./routes/transaction.routes")


/**
 * - Use Routes
 */
app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transaction", transactionRouter)

module.exports = app
