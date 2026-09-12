import api from "./api"

const getTotalBalance = async ()=>{
    const response = await api.get("/accounts/totalBalance")
    return response.data.totalBalance

} 

export default getTotalBalance