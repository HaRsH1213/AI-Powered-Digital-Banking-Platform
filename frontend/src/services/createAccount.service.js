import api from "./api"

const createAccount = async (accountData) => {
  const response = await api.post("/accounts", accountData)
  return response.data.account
}

export default createAccount
