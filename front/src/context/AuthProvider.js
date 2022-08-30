import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate()
    

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (!token || token ==='undefined') {
            return navigate('/login')
        }
        setAuth({ token }); 
        
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;