import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export function AuthProvider({children}){
const [user,setUser] = useState(null);
const [idToken,setIdToken] = useState(null);

useEffect(()=>{
    const savedUser = localStorage.getItem("user");
    const savedIdToken = localStorage.getItem("idToken");

    if(savedUser && savedIdToken){
        setUser(JSON.parse(savedUser));
        setIdToken(savedIdToken);
    }
},[]);

const login = (userData,token)=>{
setUser(userData);
setIdToken(token);
localStorage.setItem("user",JSON.stringify(userData));
localStorage.setItem("idToken",token);
}

const logout = ()=>{
    setUser(null);
    setIdToken(null);
 localStorage.removeItem("user");
 localStorage.removeItem("idToken");
}

    const value= {user,idToken,login,logout}

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}