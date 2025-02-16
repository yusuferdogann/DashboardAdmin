import { children, createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()


const Userprovider = ({children})=>{

    const [token,setToken]=useState(null);
 
    const [value, setValue] = useState({
        email: '',
        username: '',
        password: ''
    });
    // console.log('my token auth',token)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("username")) || null);
    const [loading,setLoading] = useState(true);
    const [facilitySend,setFacilitSend] = useState()
    const [checkSpinner,setCheckSpinner] = useState(false)
    const [facilityRes,setFacilityRes] = useState([])
    const [chartThree,setChartThree] = useState([])


    useEffect(()=>{
        const soterToken= JSON.parse(localStorage.getItem("access_token"))
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
        <UserContext.Provider value={{checkSpinner,setCheckSpinner,setChartThree,chartThree,token,setToken,user,Logout,setUser,setValue,value,facilitySend,setFacilitSend,setFacilityRes,facilityRes}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export const userAuth=()=>useContext(UserContext)

export default Userprovider