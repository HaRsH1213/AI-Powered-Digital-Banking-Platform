import api from "./api"

const getBalance = async (accountNumber)=> {
    const response = await api.get(`/accounts/balance/${accountNumber}`)
    return response.data.balance

}
export default getBalance