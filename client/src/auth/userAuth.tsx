import { Children, createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()


const Userprovider = ({children})=>{

    const [token,setToken]=useState(null);
    // console.log('my token auth',token)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const soterToken= JSON.parse(localStorage.getItem("token"))
        setToken(soterToken)
        setLoading(false)
    },[])

    const Logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }
    if (loading) {
        return null
    }
    return(
        <>
        <UserContext.Provider value={{token,setToken,user,Logout,setUser}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export const userAuth=()=>useContext(UserContext)

export default Userprovider