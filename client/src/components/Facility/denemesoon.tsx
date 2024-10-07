import { colors, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { Country, State, City }  from 'country-state-city';
import {
    CountryDropdown,
    StateDropdown,
    CityDropdown,
  } from "react-country-state-dropdown";

const index = (props) => {

    const [data, setData] = useState("")
    // const [city, setCity] = useState({value3:'',value4:''})
    const [facility, setFacility] = useState({value5:'',value6:''})
    const [sweet, setSweet] = useState({value7:'',value8:''})
    const [open, setOpen] = useState({value1:'',value2:''})
    const [save,setSave] = useState()
    const [cityName,setCityName] = useState([])
    const [sehir,setSehir] = useState([])
    const [nana,setNana] = useState([])
    const [num,setNum] = useState([])
    const [code,setCode]= useState([])
    const [vardi,setVardi] = useState([])
    const [send,setSend] = useState([])
    // =========================================
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [language, setLanguage] = useState(null);
  
    const handleSetCountry = (e, value) => setCountry(value);
    const handleSetState = (e, value) => setState(value);
    const handleSetCity = (e, value) => setCity(value);

    console.log("country",country?.native)
    console.log("city",city?.name)
    console.log("state",state?.name)


    // const styles = {
    //     popup: {
    //         color: "#3de846"
    //     }
    // }
   useEffect(()=>{
    const countryName = Country.getAllCountries();

    setCityName(countryName)

   },[])
//     const handleChange1 = (e,vv)=>{
        
//         setOpen({value1:cityName[e.target.value].name,value2:1})
//         setVardi(cityName[e.target.value].name)
//         setNum(cityName[e.target.value].isoCode)

//         setSend([...send,{"ulke":cityName[e.target.value].name}])

//    }

//    const handleChange2 = (e,vv)=>{
//     // yusuf();
//     const bak = num
//         let geldi =  State.getStatesOfCountry(bak)
        
//         geldi.forEach(element => {
//             if (element.isoCode===e.target.value) {
//                 setCity({value3:element.name,value4:2})
//                 setSend([...send,{"sehir":element.name}])

//             }
//         });

//         console.log("BAK",save)
//         setSehir(geldi)
        
//         setCode(e.target.value)
      
//         // countryCode = TR
//         // stateCode   = 42
        
//         // TR SEHIRLER(SEHIR INPUT)
//         // let y =  State.getStatesOfCountry(bak)


//         // KONYANIN ILCELERI(ILCE INPUT)
//         // let y = City.getCitiesOfState('TR', '34')

//         // ILCELER
//         // let y = City.getCitiesOfCountry('TR')

//         // BUTUN ULKELER(ULKELER INPUT)
//         // let y = Country.getAllCountries()

//         // BUTUN SEHIRLER
//         // let y = State.getAllStates()
       
//         // let y = City.getAllCities()


//         // let y =Country.getCountryByCode() 


//         // console.log('bakkk',geldi[e.target.key])
// }
// const handleChange3 = (e,vv)=>{
//     setFacility({value5:e.target.value,value6:3})
//     setSend([...send,{"tesis":e.target.value}])
// }
// const handleChange7 = (e)=>{
//     setSweet({[e.target.name]: e.target.value,value8:4})
//     console.log("sweet",sweet.value7.length)
// }
// const handleChange4 = (e,vv)=>{
//     setSweet({value7:e.target.value,value8:4})

//     let y = City.getCitiesOfState(num , code)
//     setSend([...send,{"ilce":e.target.value}])

//     setNana(y)
//     // console.log("hhhhh",y)
// }
// console.log("senddddd",send)
props.facilityData(send)
    return (
        <div className='flex justify-between gap-2 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  mb-12 '>
            <div>
                {/* <h6 className="mb-4">Tesis Ayarları</h6> */}
                <div className="flex items-end " >
       
   <div>
    <label htmlFor="">Ülke Seçin</label>
   <CountryDropdown
        clearable
        searchable
        value={country}
        placeHolder='selam'
        priority={['TR']}
        native='false'
        onChange={handleSetCountry}
      />
   </div>
    <div>
    <label htmlFor="">Şehir Seçin</label>
    <StateDropdown
        clearable
        searchable
        country={country}
        value={state}
        onChange={handleSetState}
      />
    </div>
     <div>
        <label htmlFor="">İlçe Seçin</label>
     <CityDropdown
        clearable
        searchable
        // allowFreeFormText
        country={country}
        state={state}
        value={city}
        onChange={handleSetCity}
      />
     </div>
     
                </div>
            </div>
            {/* <div className='flex justify-end  w-50' >
                <div className="grid justify-end w-50" >
                    <div className=' px-5  justify-end w-50'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-end"><i  style={{ color: open.value2 === 1 ? "#3de846" : "black" }} className="fa-solid fa-flag" ></i></span>
                            <span className="text-normal font-bold"    >{open.value1 ? vardi : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-50'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-start"><i style={{ color: city.value4 === 2 ? "#3de846" : "black" }}   className="fas fa-globe-europe"  ></i></span>
                            <span className="text-normal font-bold">{city.value3 ? city.value3 : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-50'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-start"><i style={{ color: facility.value6 === 3 ? "#3de846" : "black" }}  className="fas fa-map-marker-alt" ></i></span>
                            <span className="text-normal font-bold">{facility.value5 ? facility.value5 : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-50' >
                        <div className="flex justify-between">
                            <span className="text-normal  justify-end"><i style={{ color: sweet.value8 === 4 ? "#3de846" : "black" }} className="fas fa-industry" ></i></span>
                            <span className="text-normal font-bold" >{sweet.value7 ? sweet.value7 : "-----"}</span>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default index