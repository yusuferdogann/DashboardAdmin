import { Children, createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()


const Userprovider = ({children})=>{

    const [token,setToken]=useState(null);
  //   const [value, setValue] = useState({
  //     email: '',
  //     company_info:[ 
  //     {
  //         company_name:"CARBONISTAN",
  //         cknNumber:"555333444",
  //         companyNumber:"(332) 111 11 11",
  //         companyMail:"info@carbonistan.com",
  //         companyWebsite:"www.yusuferdogan.com.tr",
  //         productArea:"10.000m2",
  //         closeArea:"5.000m2",
  //         openArea:"5.000m2",
  //         workerCount:"220",
  //         totalArea:"11.500m2",
  //     }
  //     ],
  //     company_logo:'',
  //     facility:[
  //      {
  //         name:"ASELSAN ANKARA SUBE",
  //         country:'Turkiye',
  //         city:'Konya',
  //         town:'Selcuklu',
  //         totalco2: "2.500ton",
  //         data:{
  //           "scope1": {
  //               states: [
  //                 {
  //                   id: 1,
  //                   name: "SABIT YANMA",
  //                   data: [
  //                       {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //                   ],
  //                 },
  //                 {
  //                   id: 2,
  //                   name: "HAREKETLI YANMA",
  //                   data: [
  //                       {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //                   ],
  //                 },
  //                 {
  //                   id: 3,
  //                   name: "DOGRUDAN SIZMA KACAK EMISYONU",
  //                   data: [
  //                       {"kaynak":"buzdolabi","birim":"megawatt","miktar":"1000m3"}
  //                   ],
  //                 },
  //               ],
  //           },
  //          "scope2": {
  //               states: [
  //                 {
  //                   id: 1,
  //                   name: "Satın Alınan Enerji",
  //                   data: [
  //                       {"name":"buzdolabi","birim":"megawatt","miktar":"1000m3"},
  //                       {"name":"derin dondurucu","birim":"kilowatt","miktar":"350m3"}
  //                   ],
  //                 },
  //               ],
  //           },
  //          "scope3": {
  //               states: [
  //                 {
  //                   id: 1,
  //                   name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
  //                   data: [
  //                       {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //                   ],
  //                 },
  //                 {
  //                   id: 2,
  //                   name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
  //                   data: [{
  //                       "sahsiaraclar":[
  //                           {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //                       ],
  //                       "servisaraclar":[
  //                           {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //                       ],
  //                       "musteriziyareti":[
  //                           {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //                       ],
  //                       "isseyahatlari":[
  //                           {"aracturu":"otobus","yakitturu":"dizel","birim":"lt","miktar":"400"}
  //                       ]
  //                   }],
  //                 },
  //               ],
  //           },
  //         }  
  //      }
  //     ],
  //     username: '',
  //     password: ''
  // });
    const [value, setValue] = useState({
        email: '',
        company_info:[ 
        {
            company_name:"CARBONISTAN",
            cknNumber:"555333444",
            companyNumber:"(332) 111 11 11",
            companyMail:"info@carbonistan.com",
            companyWebsite:"www.yusuferdogan.com.tr",
            productArea:"10.000m2",
            closeArea:"5.000m2",
            openArea:"5.000m2",
            workerCount:"220",
            totalArea:"11.500m2",
        }
        ],
        company_logo:'',
        facility:[],
        username: '',
        password: ''
    });
    // console.log('my token auth',token)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("username")) || null);
    const [loading,setLoading] = useState(true);
    const [facilitySend,setFacilitSend] = useState()
    const [checkSpinner,setCheckSpinner] = useState(false)
    const [facilityRes,setFacilityRes] = useState([])


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
        <UserContext.Provider value={{checkSpinner,setCheckSpinner,token,setToken,user,Logout,setUser,setValue,value,facilitySend,setFacilitSend,setFacilityRes,facilityRes}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export const userAuth=()=>useContext(UserContext)

export default Userprovider