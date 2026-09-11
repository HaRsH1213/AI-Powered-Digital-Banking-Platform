import api from "./api"

const getBalance = async (accountId)=> {
    const response = await api.get(`/accounts/balance/${accountId}`)
    return response.data.balance

}
export default getBalance