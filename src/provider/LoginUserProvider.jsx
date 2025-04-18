import {createContext, useState} from "react";

export const UseLoinUserContext=createContext(null);

export function LoginUerProvider({children}){
    const [loginUser,setLoginUser]=useState(null)
    return(
        <UseLoinUserContext.Provider value={[loginUser,setLoginUser]}>
            {children}
        </UseLoinUserContext.Provider>
    )
}