import api from "./api"

export const login = async (credentials)=>{
    const response = await api.post("/auth/login", credentials)
    return response.data.user

}


export const logout = async () => {
    return await api.post("/auth/logout")
}

export const register = async (userData) =>{
    const response = await api.post("/auth/register", userData)
    return response.data.user
}

export const verifyEmail = async (otp) => {
    const response = await api.post("/auth/verify-email", { otp })
    return response.data
}

export const resendOtp = async () => {
    const response = await api.post("/auth/resend-otp")
    return response.data
}

// export default {login, logout}
