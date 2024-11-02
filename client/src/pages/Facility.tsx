import React, { useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import { Tooltip, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import Facilitynone from '../common/Facilitynote';
import { post } from '../server/Apiendpoint';
import { userAuth } from '../auth/userAuth';
import {
    CountryDropdown,
    StateDropdown,
    CityDropdown,
    LanguageDropdown,
    PhoneInput,
} from "react-country-state-dropdown";
import { NavLink, useNavigate } from 'react-router-dom';





const Facility = () => {

    const [size, setSize] = React.useState(null);

    const { value, setFacilitSend,token } = userAuth();

    const handleOpen = (value) => setSize(value);
    const navigate = useNavigate();


    // const FacilityAllData = [
    //     {
    //         id: 1,
    //         facilityname: 'ASELSAN-ISTANBUL SUBE',
    //         country:'Turkiye',
    //         city:'Konya',
    //         town:'Selcuklu',
    //         totalco2: "12.500ton"
    //     },
    //     {
    //         id: 2,
    //         facilityname: 'ASELSAN-KONYA SUBE',
    //         country:'Turkiye',
    //         city:'Konya',
    //         town:'Selcuklu',
    //         totalco2: "5000ton"
    //     },
    //     {
    //         id: 3,
    //         facilityname: 'ASELSAN-ANKARA SUBE',
    //         country:'Turkiye',
    //         city:'Konya',
    //         town:'Selcuklu',
    //         totalco2: "2.500ton"
    //     }
    // ]


    const [veri, setVeri] = useState()
    const [facilitydata, setFacilitydata] = useState([value])

    // CountrySelect Dropdown====================
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [dropcity, setDropCity] = useState(null);
    const [language, setLanguage] = useState(null);

    const handleSetCountry = (e, value) => setCountry(value);
    const handleSetState = (e, value) => setState(value);
    const handleSetCity = (e, value) => setDropCity(value);
    const [sweet, setSweet] = useState('')
    // console.log("country---------------",country?.native)
    // console.log("state------------------",state?.name)
    // console.log("city------------------",dropcity)


    const deneme = "yuusfd";
    // =========================================
    const newData = facilitydata[0].facility
    const [getVeri, setGetVeri] = useState({
        name: "",
        country: '',
        city: '',
        town: '',
        totalco2: "",
    })
    const [summary, setSummary] = useState(newData)
    const getData = (data) => {
        console.log("ss", data)
        setVeri(data)
    }

    const [data, setData] = useState({
        facilityname: '',
        employeecount: '',
        totalarea: '',
    })
    const [checkSpinner, setCheckSpinner] = useState(false)

    // Tesis Ekle kisminda calisan kisim
    const changeSave = (e) => {
        e.preventDefault()
        setData({
            ...data,
            country:country?.native,
            city:state?.name,
            state:dropcity?.name,
            [e.target.name]: e.target.value,
        });
        console.log("result", data)
    }
    // Post isleminin olacagi alan
    const saveData = async (e) => {
        e.preventDefault();
        handleOpen(null)
        setFacilitydata([...facilitydata, data])
        console.log("data--------",data)
        console.log("local-storage",localStorage.getItem("access_token"))
        console.log("TOKEN",token)

        
const config = {
    headers:{
        "Content-Type" : "application/json",
        Authorization:"Bearer " + token
    }
}



        try {
            const addfacilitydata = await post( '/addfacility',{data},{headers:
                { 'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }})
            const response = addfacilitydata
            console.log("facility-data", response)

        } catch (error) {
            console.log(error)
        }

       

    }

    // Maptedeki verileri tikladigimizda alabiliryoruz bu veriyi Calculation sayfasina gondermek icin
    const getAllData = (index) => {
        summary.map((p) => p.id === index
            ? setGetVeri(p)
            : ""

        )
        setCheckSpinner(true)

        setTimeout(() => {
            navigate('/calculation')
        }, 750)


    }
    // hazir veri
    setFacilitSend(getVeri)

    return (

        <>

            <Breadcrumb pageName="Tesisler" />
            {checkSpinner ? <div role="status" className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm"
                style={{ opacity: '1', position: 'fixed', top: '0', left: '0', zIndex: '12343' }}>
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            </div> : null}

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 relative '>

                {
                    summary.map((item, index) => (
                        <div >
                            {/* group relative flex items-center gap-2.5 rounded-sm
                        py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out
                        hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4 active */}
                            <div className="flex flex-col items-center bg-white cursor-pointer  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
                                <i style={{ fontSize: '50px' }} className="fa-solid fa-industry px-3"></i>
                                <div key={index} className="flex flex-col justify-between p-4 w-100 leading-normal">
                                    <div className='flex justify-between  items-center'>
                                        {veri ? <input type='text' placeholder='' className='w-70 rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white  ' /> : <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>}
                                        <Facilitynone onClick={getData} />
                                    </div>
                                    <div onClick={() => getAllData(index)}>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                        <div className='flex justify-between'><span className='font-normal'>Ulke:</span><span className='font-semibold'>{item.country}</span></div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                        <div className='flex justify-between'><span className='font-normal'>Sehir:</span><span className='font-semibold'>{item.city}</span></div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                        <div className='flex justify-between'><span className='font-normal'>Ilce:</span><span className='font-semibold'>{item.town}</span></div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                        <div className='flex justify-between'><span className='font-normal'>Toplam Emilsyon:</span><span className='font-semibold'>{item.totalco2}</span></div>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


                <div>
                    <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
                        {/* <i style={{ fontSize: '50px' }} class="fa-solid fa-industry px-3"></i> */}
                        <div className="flex flex-col justify-between h-[155px] w-full leading-normal relative" onClick={() => handleOpen("sm")}>
                            <div className='absolute top-0'>
                                <Tooltip content="Tesis Ekleyin" placement="right" style={{ color: "red", zIndex: "0" }}>
                                    <button className='flex justify-center items-center relative z-3320' style={{ height: '140px', width: '240px', borderRadius: '20px' }}></button>
                                </Tooltip>
                            </div>
                            <div style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%', fontSize: '40px' }} className='absolute  translate-x-1/2  translate-y-2/4' > +</div>
                        </div>
                    </a>
                </div>
            </div>


            <div className="mb-3 flex gap-3">

                {/* <Button   color="blue" variant="gradient">
          Rapor Al
        </Button> */}

            </div>
            <Dialog
                open={
                    size === "xs" ||
                    size === "sm" ||
                    size === "md" ||
                    size === "lg" ||
                    size === "xl" ||
                    size === "xxl"
                }
                size={size || "sm"}
                handler={handleOpen}
            >
                <DialogHeader className='text-center relative' style={{display:'block'}}>Tesis Bilgilerinizi Girin</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1" >
                        <div>
                            <div className="flex flex-col items-center bg-white mx-auto w-full border-gray-200  md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 ">
                                <div className="flex flex-col justify-between p-4 w-full leading-normal" >
                                    <div className='flex justify-between w-full  items-center'>
                                        <input
                                            type='text'
                                            value={data.facilityname}
                                            name='facilityname'
                                            onChange={changeSave}
                                            placeholder='Tesis bilgilerinizi girin'
                                            className='w-full rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white  ' />

                                    </div>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                        <div className='flex justify-between'><span className='font-normal'>Çalışan Sayısı:</span><span className='font-normal'>
                                            <input
                                                type='number'
                                                value={data.employeecount}
                                                name='employeecount'
                                                onChange={changeSave}
                                                placeholder='Çalışan sayınızı girin'
                                                className='w-90 rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white  ' />
                                        </span></div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                        <div className='flex justify-between'><span className='font-normal'>Toplam Emilsyon:</span><span className='font-normal'>
                                            <input
                                                type='number'
                                                value={data.totalarea}
                                                name='totalarea'
                                                onChange={changeSave}
                                                placeholder='Kapasitenizi girin'
                                                className='w-90 rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white' />
                                        </span>
                                        </div>
                                    </p>
                                    <div className="" >
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">

                                        <div className='flex justify-between'>
                                           <div> <span className='font-normal'>Ülke:</span><span className='font-semibold'></span></div>
                                            <div className=''>
                                            <CountryDropdown
                                                        clearable
                                                        searchable
                                                        value={country}
                                                        placeHolder='Ülke girin'
                                                        priority={['TR']}
                                                        native='false'
                                                        onChange={handleSetCountry}
                                                        className=''
                                                    />
                                            </div>
                                        </div>
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">

                                        <div className='flex justify-between'>
                                           <div> <span className='font-normal'>Şehir:</span><span className='font-semibold'></span></div>
                                            <div>
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
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">

                                        <div className='flex justify-between'>
                                           <div> <span className='font-normal'>Şehir:</span><span className='font-semibold'></span></div>
                                            <div>
                                            <CityDropdown
                                                        className=''
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
                                        </p>
                                        </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="mr-1"
                    >
                        <span>İptal Et</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={(e) => saveData(e)}
                    >
                        <span>Kaydet</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default Facility