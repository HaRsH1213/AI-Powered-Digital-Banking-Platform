const express = require('express')
const getReceiverName = require("../controller/receiver.controller")


const router = express.Router()


router.get("/:accountNumber", getReceiverName)

module.exports = router