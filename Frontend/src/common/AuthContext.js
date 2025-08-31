import { createContext } from "react";

export const AuthContext = createContext({
    userName : null,
    token : null,
    login : ()=>{},
    logout : ()=>{}
})

