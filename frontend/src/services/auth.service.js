import api from "./api"

export const login = async (credentials)=>{
    const response = await api.post("/auth/login", credentials)
    return response.data.user

}


export const logout = async () => {
    return await api.post("/auth/logout")
}

// export default {login, logout}