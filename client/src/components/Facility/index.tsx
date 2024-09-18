import { colors, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { Country, State, City }  from 'country-state-city';

const index = (props) => {

    const [data, setData] = useState("")
    const [city, setCity] = useState({value3:'',value4:''})
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

    const styles = {
        popup: {
            color: "#3de846"
        }
    }
   useEffect(()=>{
    const countryName = Country.getAllCountries();

    setCityName(countryName)

   },[])
    const handleChange1 = (e,vv)=>{
        
        setOpen({value1:cityName[e.target.value].name,value2:1})
        setVardi(cityName[e.target.value].name)
        setNum(cityName[e.target.value].isoCode)

        setSend([...send,{"ulke":cityName[e.target.value].name}])

   }

   const handleChange2 = (e,vv)=>{
    // yusuf();
    const bak = num
        let geldi =  State.getStatesOfCountry(bak)
        
        geldi.forEach(element => {
            if (element.isoCode===e.target.value) {
                setCity({value3:element.name,value4:2})
                setSend([...send,{"sehir":element.name}])

            }
        });

        console.log("BAK",save)
        setSehir(geldi)
        
        setCode(e.target.value)
      
        // countryCode = TR
        // stateCode   = 42
        
        // TR SEHIRLER(SEHIR INPUT)
        // let y =  State.getStatesOfCountry(bak)


        // KONYANIN ILCELERI(ILCE INPUT)
        // let y = City.getCitiesOfState('TR', '34')

        // ILCELER
        // let y = City.getCitiesOfCountry('TR')

        // BUTUN ULKELER(ULKELER INPUT)
        // let y = Country.getAllCountries()

        // BUTUN SEHIRLER
        // let y = State.getAllStates()
       
        // let y = City.getAllCities()


        // let y =Country.getCountryByCode() 


        // console.log('bakkk',geldi[e.target.key])
}
const handleChange3 = (e,vv)=>{
    setFacility({value5:e.target.value,value6:3})
    setSend([...send,{"tesis":e.target.value}])

    

    

}
const handleChange4 = (e,vv)=>{
    setSweet({value7:e.target.value,value8:4})

    let y = City.getCitiesOfState(num , code)
    setSend([...send,{"ilce":e.target.value}])

    setNana(y)
    // console.log("hhhhh",y)
}
// console.log("senddddd",send)
props.facilityData(send)
    return (
        <div className='flex justify-between gap-2 p-4 border border-slate-200 rounded-2xl bg-sky-100 mb-6 '>
            <div>
                {/* <h6 className="mb-4">Tesis Ayarları</h6> */}
                <div className="flex items-end " >
                    <div>
                        <span className="mb-2 font-bold">Ulke</span>
                        <div className=" w-50 me-5">
                            <select onClick={(e)=>handleChange1(e,1)}  className="h-11 border border-gray-300 text-gray-600 text-base rounded-lg  mt-1 w-full py-2.5 px-4 ">
                                <option selected>Ülke Seçin</option>
                                {
                                    cityName?.map((city,index)=>(
                                        
                                        <option value={index} key={index}>{city.name}</option>
                                        
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <span className="mb-2 font-bold">Şehir</span>
                        <div className=" w-50 me-5">
                            <select onClick={(e)=>handleChange2(e,1)} id={save} className="h-11 border border-gray-300 text-gray-600 text-base rounded-lg  mt-1 w-full py-2.5 px-4 ">
                                <option selected>Şehir Seçin</option>
                               {
                                 sehir?.map((bb,index)=>(
                                    <>
                                    <option key={index} value={bb.isoCode} id={bb.name} className="yusuf">{bb.name}</option>
                                    </>
                                 ))
                               }

                            </select>
                        </div>
                    </div>
                  
                    <div>
                        <span className="mb-2 font-bold">İlçe</span>
                        <div className=" w-50 me-5">
                            <select onClick={(e)=>handleChange4(e,4)} id="countries" className="h-11 border border-gray-300 text-gray-600 text-base rounded-lg  mt-1 w-full py-2.5 px-4 ">
                                <option selected>İlçe Seçin</option>
                                {
                                    nana?.map((vv)=>(
                                        <>
                                            <option>{vv.name}</option>
                                        </>
                                    ))
                                }                               
                            </select>
                        </div>
                    </div>
                    {/* <div>
                        <span className="mb-2 font-bold">Tesis</span>
                        <div className=" w-50 me-5">
                            <select onChange={(e)=>handleChange3(e,3)} id="countries" className="h-11 border border-gray-300 text-gray-600 text-base rounded-lg  mt-1 w-full py-2.5 px-4 ">
                                <option selected>Tesis Seçin</option>
                                <option value="Okul">Okul</option>
                                <option value="Fabrika">Fabrika</option>
                                <option value="Ofis">Ofis</option>
                                <option value="Atölye">Atölye</option>
                            </select>
                        </div>
                    </div> */}
                    <div>
                    <span className="mb-2 block font-bold">Tesis</span>
                    <div className=" w-50 me-5">
                        <input type="text" placeholder="Tesis girin" className="h-11 border border-gray-300 text-gray-600 text-base rounded-lg  mt-1 w-full py-2.5 px-4 "/>
                    </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end  w-50' >
                <div className="grid justify-end w-50" >
                    <div className=' px-5  justify-end w-40'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-end"><i  style={{ color: open.value2 === 1 ? "#3de846" : "black" }} className="fa-solid fa-flag" ></i></span>
                            <span className="text-normal font-bold"    >{open.value1 ? vardi : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-40'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-start"><i style={{ color: city.value4 === 2 ? "#3de846" : "black" }}   className="fas fa-globe-europe"  ></i></span>
                            <span className="text-normal font-bold">{city.value3 ? city.value3 : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-40'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-start"><i style={{ color: facility.value6 === 3 ? "#3de846" : "black" }}  className="fas fa-map-marker-alt" ></i></span>
                            <span className="text-normal font-bold">{facility.value5 ? facility.value5 : "-----"}</span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-40'>
                        <div className="flex justify-between">
                            <span className="text-normal  justify-end"><i style={{ color: sweet.value8 === 4 ? "#3de846" : "black" }} className="fas fa-industry" ></i></span>
                            <span className="text-normal font-bold">{sweet.value7 ? sweet.value7 : "-----"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index