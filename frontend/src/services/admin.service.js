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

