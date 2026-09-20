import createPendingTransfer from "../utils/pendingTransfer"
import api from "./api"



const transfer = async (fromAccount, toAccount, amount) =>{
    const transferData = createPendingTransfer(fromAccount, toAccount, amount)

    const response = await api.post("/transaction",
        {
            fromAccount : transferData.fromAccount,
            toAccount : transferData.toAccount,
            amount : transferData.amount

        },
        {
            headers: {
                "idempotencyKey" : transferData.idempotencyKey
            }
        }
    )

    return response.data
}


export default transfer