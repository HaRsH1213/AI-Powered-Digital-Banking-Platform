import api from "./api"



const getReceiverName = async (accountNumber) => {
    const response = await api.get(`/receiver/${accountNumber}`)
    return response.data.user.name
}

export default getReceiverName