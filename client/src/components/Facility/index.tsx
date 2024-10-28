import { colors, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { Country, State, City } from 'country-state-city';
import { userAuth } from '../../auth/userAuth';


const index = (props) => {

    const [data, setData] = useState("")
    const { value,setFacilitSend,facilitySend } = userAuth();

    // const [city, setCity] = useState({ value3: '', value4: '' })
    const [facility, setFacility] = useState({ value5: '', value6: '' })
    const [sweet, setSweet] = useState('')
    const [open, setOpen] = useState({ value1: '', value2: '' })
    const [save, setSave] = useState()
    const [cityName, setCityName] = useState([])
    const [sehir, setSehir] = useState([])
    const [nana, setNana] = useState([])
    const [num, setNum] = useState([])
    const [code, setCode] = useState([])
    const [vardi, setVardi] = useState([])
    const [send, setSend] = useState([])
    // =========================================
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [dropcity, setDropCity] = useState(null);
    const [language, setLanguage] = useState(null);

    // const handleSetCountry = (e, value) => setCountry(value);
    // const handleSetState = (e, value) => setState(value);
    // const handleSetCity = (e, value) => setDropCity(value);



    const styles = {
        popup: {
            overflow: "hidden"
        }
    }
    useEffect(() => {
        const countryName = Country.getAllCountries();

        setCityName(countryName)

    }, [])
    const handleChange1 = (e, vv) => {

        setOpen({ value1: cityName[e.target.value].name, value2: 1 })
        setVardi(cityName[e.target.value].name)
        setNum(cityName[e.target.value].isoCode)

        setSend([...send, { "ulke": cityName[e.target.value].name }])

    }

    const handleChange2 = (e, vv) => {
        // yusuf();
        const bak = num
        let geldi = State.getStatesOfCountry(bak)

        geldi.forEach(element => {
            if (element.isoCode === e.target.value) {
                setCity({ value3: element.name, value4: 2 })
                setSend([...send, { "sehir": element.name }])

            }
        });

        console.log("BAK", save)
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
    const handleChange3 = (e, vv) => {
        setFacility({ value5: e.target.value, value6: 3 })
        setSend([...send, { "tesis": e.target.value }])
    }
    const handleChange7 = (e) => {
       
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
             }
       else{
        setSweet(e.target.value)
       }   
    }
    const handleChange4 = (e) => {
        // setSweet(e.target.value)
        // console.log(sweet.length)

        let y = City.getCitiesOfState(num, code)
        setSend([...send, { "ilce": e.target.value }])

        setNana(y)
        // console.log("hhhhh",y)
    }
    // console.log("senddddd",send)
    // props.facilityData(send)
    // console.log("send-data",send)
    // console.log("calculation-ust",facilitySend?.name)
    return (
        <div className='flex justify-between gap-2 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  mb-12 '>
            <div>
                {/* <h6 className="mb-4">Tesis Ayarları</h6> */}
                {/* <div className="flex items-start" >
                    <div>
                        <span className="mb-2 font-bold">Ülke</span>
                        <div className="me-5">
                            <CountryDropdown
                                clearable
                                searchable
                                value={country}
                                placeHolder='Ülke girin'
                                priority={['TR']}
                                native='false'
                                onChange={handleSetCountry}
                            />
                        </div>
                    </div>
                    <div>
                        <span className="mb-2 font-bold">Şehir</span>
                        <div className="me-5">
                            

                            <StateDropdown
                                clearable
                                placeHolder='Şehir girin'
                                searchable
                                country={country}
                                value={state}
                                onChange={handleSetState}
                            />
                        </div>
                    </div>

                    <div>
                        <span className="mb-2 font-bold">İlçe</span>
                        <div className="me-5">
                        <CityDropdown
                                className='w-40'
                                clearable
                                searchable
                                placeHolder='İlçe girin'
                                // allowFreeFormText
                                country={country}
                                state={state}
                                value={dropcity}
                                onChange={handleSetCity}
                            />

                        </div>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <span className="mb-0 block font-bold">Tesis</span>
                        <div className=" w-50 me-5">
                            <input  onChange={(e) => handleChange7(e)} value={sweet} maxLength={31}   name='value7' type="text" placeholder="Tesis girin" className="w-full rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white  " />
                            <small className="mt-2 text-sm text-red-600 dark:text-red-500">{sweet?.length === 31 ? "Max karakter sayısına ulaştınız" : ''}</small>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='flex justify-end  w-50' >
                <div className="grid justify-end w-50" >
                    <div className=' px-5  justify-end w-100' >
                        <div className="flex justify-between">
                            <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.country ? facilitySend?.country : country?.native ? country?.native : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.country ? "#3de846" : country?.name ? "#3de846" : "black" }} className="fa-solid fa-flag" ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                        <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.city ? facilitySend?.city : dropcity?.name ? dropcity?.name : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.city? "#3de846" : dropcity  ? "#3de846" : "black" }} className="fas fa-globe-europe"  ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                        <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.town? facilitySend?.town : state?.name ? state?.name : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.town ? "#3de846" : state?.name ? "#3de846" : "black" }} className="fas fa-map-marker-alt" ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                            <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.name ? facilitySend?.name : sweet ? sweet : "-----"}</span>
                            <span className="text-normal  justify-end" ><i style={{ color:facilitySend?.town ? '#3de846' : sweet   ? "#3de846" : "black" }} className="fas fa-industry" ></i></span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index