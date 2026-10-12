import api from "./api"

export const getAdminOverview = async() => {
  const response = await api.get("/admin/overview")
  return response.data.overview
}
