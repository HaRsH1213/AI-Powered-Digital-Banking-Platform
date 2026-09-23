import api from "./api"

const fetchTrnsactions = async() => {
    const response = await api.get("/transaction")
    return response.data.transactions
}

export default fetchTrnsactions