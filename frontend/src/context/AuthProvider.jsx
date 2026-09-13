import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import {login, logout} from "../services/auth.service";



const AuthContext = createContext(null)


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const loadLoggedInUser = async () => {
            try {
                const response = await api.get("auth/me")
                setUser(response.data.user)
            } catch (error) {
                console.log("Something wnt wrong while fetching the loggedInUser", error);
                
                
            } finally{
                setLoading(false)
            }

        }
        loadLoggedInUser()

    }, [])

    const signIn = async (credentials) => {
        const loggedInUser  = await login(credentials)
        setUser(loggedInUser)
        return loggedInUser
    }

    const signOut = async () =>{
        try{
            await logout()
        } finally{
            setUser(null)
        }
        
        
    }
    return (
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
    
    
}

export const useAuth = () =>{
    return useContext(AuthContext)
}