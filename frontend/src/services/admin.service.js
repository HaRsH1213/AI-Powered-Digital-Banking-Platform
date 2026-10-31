import api from "./api"

export const getAdminOverview = async() => {
  const response = await api.get("/admin/overview")
  return response.data.overview
}

export const getAdminCustomers = async ({page = 1, search = "", verification = "all" } = {}) =>{
  const response = await api.get("/admin/customers", {
    params: {page, search, verification}
  })
  return response.data

}

export const getAdminCustomerDetails = async (customerId) => {
  const response = await api.get(`/admin/customers/${customerId}`)
  return response.data.customer
}

export const getAdminAccounts = async ({page = 1, search = "", status = "all"} = {}) => {
  const response = await api.get("/admin/accounts", { params: { page, search, status } })
  return response.data  
}

export const updateAdminAccountStatus = async (accountId, status) => {
  const response = await api.patch(`/admin/accounts/${accountId}/status`, { status })
  return response.data.account
}

export const addInitialFunds = async ({toAccount, amount, idempotencyKey}) => {
  const response = await api.post("/transaction/system/initial-funds", {
    toAccount, 
    amount, 
    idempotencyKey
  })
  return response.data.transaction
}

