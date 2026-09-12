const createPendingTransfer = (fromAccount, toAccount, amount)=>{
    const existingTransfer = sessionStorage.getItem("pendingTransfer")

    if(existingTransfer){
        return JSON.parse(existingTransfer)
    }

    const transferData = {
        idempotencyKey : crypto.randomUUID(),
        fromAccount,
        toAccount,
        amount
    }

    sessionStorage.setItem(
        "pendingTransfer",
        JSON.stringify(transferData)
    ) 
    return transferData

}
export const getPendingTransfer = ()=> {
    const savedData = sessionStorage.getItem("pendingTransfer")
    return savedData
    ?  JSON.parse(savedData)
    : null
}

export const clearPendingTransfer = ()=> {
    sessionStorage.removeItem("pendingTransfer")
}

export default createPendingTransfer