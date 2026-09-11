import api from "./api"

const getAccounts = async ()=> {
    const response = await api.get("/accounts")
    return response.data.accounts
}

export default getAccounts