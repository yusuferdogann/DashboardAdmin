import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import { Tooltip, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import Facilitynote from '../common/Facilitynote';
import { post, get, put } from '../server/Apiendpoint';
import { userAuth } from '../auth/userAuth';
import { CountryDropdown, StateDropdown, CityDropdown, LanguageDropdown, PhoneInput, } from "react-country-state-dropdown";
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import Settings from './Settings';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'; // ✅ React-Toastify import
import { ClipLoader } from 'react-spinners';




const Facility = () => {
    // CountrySelect Dropdown====================
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [dropcity, setDropCity] = useState(null);
    const [language, setLanguage] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");


    const handleSetCountry = (e, value) => setCountry(value);
    const handleSetState = (e, value) => setState(value);
    const handleSetCity = (e, value) => setDropCity(value);
    // =========================================


    const [size, setSize] = useState(null);
    const [resultData, setResultData] = useState([])

    const { value, setFacilitSend, token, setFacilityRes } = userAuth();
    const [sendUpdateData, setSendUpdateData] = useState({ id: '', title: '' })
    const [tesisName, setTesisName] = useState()
    const [changeData, setChangeData] = useState({ facilityname: '' })

    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // console.log("res------",facilitySend)
    // console.log("senddd------",facilityRes)
    const handleCountryChangeCode = (country) => {
        console.log("Seçilen Ülke Nesnesi: ", country?.target?.dataset?.iso3); // Nesneyi konsola yazdırıyoruz
        // country.name veya country.code gibi alanları kullanarak doğru değeri alabiliriz
        setSelectedCountry(country?.target?.dataset?.iso3); // Ülkenin kodunu state'e kaydediyoruz
    };

    // const handleOpen = (value) => setSize(value);

    const navigate = useNavigate();
    const locationmap = useLocation();

    // console.log("yol-------", locationmap.pathname)
    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    // Konum bilgilerini almak için getLocation fonksiyonu
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Konum bilgilerini güncelleme
            setData(prevData => ({
                ...prevData,
                latitude,
                longitude,
            }));
        });
    };


    const checkFacilityLimit = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer: " + token
                }
            };

            const response = await post('/checkFacilityLimit', {}, config);

            if (response.data.facilityLimit <= 0) {
                toast.warning("Limitiniz doldu! Yeni tesis ekleyemezsiniz.");
                return false; // Modal açılmasını engelle
            }

            return true; // Limit uygunsa devam et
        } catch (error) {
            console.error("Facility limit kontrol edilirken hata oluştu:", error);
            toast.error("Sunucu hatası! Daha sonra tekrar deneyin.");
            return false;
        }
    };

    const handleOpen = async (value) => {
        const isAllowed = await checkFacilityLimit(); // Önce limiti kontrol et
        if (isAllowed) {
            setSize(value); // ✅ Eğer limit uygunsa modalı aç
        }
    };


    useEffect(() => {
        let isCancelled = false;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };
        const fetchData = async () => {
            await timeout(1000)
            if (!isCancelled) {
                const dataResult = await get('/getfacility', config);
                setCheckLoading(dataResult)
                const responseResult = dataResult
                // console.log("getFacility------------------------------", responseResult.data.data)
                setResultData(responseResult.data.data)
                setFacilityRes(responseResult.data.data)
            }

        }

        fetchData();
        return () => {
            isCancelled = true;
        }

    }, [resultData])


    const [veri, setVeri] = useState()
    const [updateId, setUpdateId] = useState()




    const [getVeri, setGetVeri] = useState({
        facilityname: "",
        country: '',
        employeecount: '',
        state: '',
        totalarea: "",
        latitude: "",
        // lontitude: "",
        CityCode: "",
        FieldActivity: ""
    })

    const getData = (data) => {
        setUpdateId(data)
        setVeri(data)
        console.log("datasss---", data)
        changeData.facilityname = data?.facilityname
        setChangeData(data?.facilityname)
    }
    // console.log("sev-------",changeData)
    const [data, setData] = useState({
        facilityname: '',
        employeecount: '',
        totalarea: '',
        latitude: "",
        // lontitude: "",
        CityCode: "",
        FieldActivity: ""

    })
    const [checkSpinner, setCheckSpinner] = useState(false)
    const [checkLoading, setCheckLoading] = useState()

    // Tesis Ekle kisminda calisan kisim
    const changeSave = (e) => {
        // e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value,
            country: country?.native,
            city: state?.name,
            state: dropcity?.name,
        });

        setGetVeri({
            facilityname: data?.facilityname,
            country: '',
            employeecount: data?.employeecount,
            state: '',
            totalarea: data?.totalarea,
            latitude: "",
            // lontitude: "",
            CityCode: "",
            FieldActivity: ""
        })
        console.log("result", data)
    }
    const LocalStorage = localStorage.getItem("Facilityname");

    // Maptedeki verileri tikladigimizda alabiliryoruz bu veriyi Calculation sayfasina gondermek icin
    const getAllData = async (item) => {

        const itemData = JSON.stringify(item)
        const getItem = localStorage.getItem('facilityInformation')


        const localData = JSON.parse(getItem)
        console.log("localData--------", item.facilityname)
        console.log("LocalStorage-----", LocalStorage)

        // setGetVeri(localData)
        setTesisName(item.facilityname)
        var tesisNo = localData?._id

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };
        const GetOnefacility = await post('/getonefacility', { tesisName, tesisNo }, config)

        console.log('getfacility name-----------------', GetOnefacility)
        if (GetOnefacility?.data.data) {
            setCheckSpinner(true)
            localStorage.setItem("facilityInformation", itemData)
            localStorage.setItem("Facilityname", item.facilityname)

            setTimeout(() => {
                navigate('/get-report')
            }, 750)
        }

    }


    // Post isleminin olacagi alan
    const saveData = async (e) => {
        e.preventDefault();
        handleOpen(null)


        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };
        try {
            const addfacilitydata = await post('/addfacility', data, config);

            console.log("added-facility-data-------", addfacilitydata)

            const tesisNo = addfacilitydata?.data?.data?._id;
            const tesisName = addfacilitydata?.data?.data?.facilityname;
            const tesisCount = addfacilitydata?.data?.data?.employeecount;
            const tesisArea = addfacilitydata?.data?.data?.totalarea;



            setTimeout(async () => {
                const informationData = {
                    companyName: tesisName,
                    cknNumber: '',
                    companyNumber: '',
                    companyMail: '',
                    companyWebsite: '',
                    productArea: '',
                    closeArea: '',
                    openArea: '',
                    workerCount: tesisCount,
                    totalArea: tesisArea,
                    address: '',
                    facilityId: tesisNo
                }
                localStorage.setItem("facilityInfoDetail", JSON.stringify(informationData))

                const loginuser = await post("/facilityinfo", informationData, config)
                console.log("facilityInfo------", loginuser)

            }, 1000)

            setResultData([...resultData, { facilityname: data.facilityname, country: data.country, employeecount: data.employeecount, state: data.state, totalarea: data.totalarea, }])
            toast.success("Tesis ismi başarılı bir şekilde eklendi.");


        } catch (error) {
            console.log(error)
        }

        setData('')
        setCountry(value);
        setState(value);
        setDropCity(value);
        // =========================================

    }



    // const changeInputValue = (event, item) => {
    //     // const { name, value } = event.target;
    //     setChangeData(item.facilityname)


    //     const changeData = item
    //     setChangeData({
    //         ...changeData,
    //         [event.target.name]: event.target.value
    //     }
    //     )
    //     console.log("data---",changeData)
    // }
    const changeInputValue = (event, item) => {
        const updatedItem = { 
            ...item, 
            [event.target.name]: event.target.value // Boş bıraktıklarında da sadece input değeri olacak
        };
    
        setChangeData(updatedItem); // Anlık olarak değişiklikleri güncelliyoruz
        console.log("Updated Item: ", updatedItem); // Anlık olarak güncellenmiş item'ı logluyoruz
    };
    
    
    

    const handleKeyDown = async (item, event = null, isClick = false) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };

        // Eğer tıklama yapılmışsa (check iconu tıklanmışsa) veya Enter tuşuna basıldıysa
        if (isClick || (event && event.key === 'Enter')) {
            // company_logo'yu hariç tutarak sadece diğer alanları güncelliyoruz
            const { company_logo, ...updatedItem } = item; // company_logo hariç tutulur

            // facilityname dışındaki diğer verileri item'den alıyoruz ve sadece facilityname'i güncelliyoruz
            updatedItem.facilityname = changeData.facilityname;

            // Güncellenmiş item'ı backend'e gönderiyoruz
            try {
                const updateFacilityName = await put('/updateFacilityName', updatedItem, config);
                console.log("Updated Facility: ", updateFacilityName); // Backend'den gelen güncellenmiş veri

                // Güncellenmiş veri ile input'u kapatıyoruz
                setVeri(false);

                // Toast uyarısı ekleyebilirsiniz (örneğin React-Toastify)
                toast.success("Tesis ismi başarılı bir şekilde güncellendi.");
                 // Hemen state güncellemesi yap
            // Hemen UI'yi güncelle
        setResultData((prevData) => {
            return prevData.map((data) => {
                if (data._id === updatedItem._id) {
                    return { ...data, ...updatedItem }; // Yeni değeri ekle
                }
                return data;
            });
        });
            } catch (error) {
                console.error("Error updating facility: ", error);
                toast.error("Error updating facility name");
            }
        }

        // Escape tuşuna basıldığında input'u kapatıyoruz
        if (event && event.key === 'Escape') {
            setVeri(true); // Input kapanır
            console.log("Escape pressed - closing input");
        }
    };




    // hazir veri
    setFacilitSend(getVeri)
    // console.log("lOca------", LocalStorage)
    return (
        < >
            <Breadcrumb pageName="Tesisler" />
            {checkSpinner ? <div role="status" className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm"
                style={{ opacity: '1', position: 'fixed', top: '0', left: '0', zIndex: '12343' }}>
                <ClipLoader size={50} color="#36d7b7" />
            </div> : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-7.5">
                {
                    resultData?.map((item, index) => (
                        <div >

                            <div className={LocalStorage === item.facilityname ? "glowing-outline flex flex-col items-center bg-white cursor-pointer  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 " : "flex flex-col items-center bg-white cursor-pointer  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 "}>
                                {/* <i style={{ fontSize: '20px' }} className="fa-solid fa-industry px-3"></i> */}
                                <div key={index} className="flex flex-col justify-between p-4 w-90  leading-normal" >
                                    <div className="flex justify-between items-center relative">
                                        {item._id === veri?._id ? (
                                            <div className="relative flex items-center w-full">
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    value={changeData?.facilityname || item.facilityname || ""} // ChangeData boşsa item.facilityname ile yer değiştir, ikisi de boşsa input alanı boş olacak
                                                    onKeyDown={(event) => handleKeyDown(item, event)}
                                                    name="facilityname"
                                                    onChange={(event) => changeInputValue(event, item)} // Anlık olarak değişiklikleri güncellenir
                                                    style={{
                                                        margin: '0',
                                                        padding: '0',
                                                        border: '0',
                                                        borderBottom: '1px solid black',
                                                        borderRadius: '0',
                                                    }}
                                                    className="w-full rounded border h-9 hover:bg-[#efefef66] py-1 mt-0 pl-2 pr-1.5 text-black bg-transparent focus-visible:outline-none dark:text-white"
                                                />

                                                {/* İptal (Cancel) ikonu */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        setVeri(false); // Değeri eski haline getirmek için
                                                    }}
                                                >
                                                    <i className="fa-solid fa-xmark"></i> {/* İptal simgesi */}
                                                </div>

                                                {/* Check iconu */}
                                                <div

                                                    className="absolute right-12 bottom-[-17px] transform -translate-y-1/2 cursor-pointer"
                                                    onClick={() => {
                                                        if (changeData.facilityname) {
                                                            handleKeyDown(item, null, true); // Kaydetmek için handleKeyDown fonksiyonunu çağırıyoruz
                                                        }
                                                    }}
                                                >
                                                    <i className="fa-solid fa-check"></i> {/* Check simgesi */}
                                                </div>
                                            </div>

                                        ) : (
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {item.facilityname}
                                            </h5>
                                        )}
                                        <Facilitynote onClick={getData} deleteData={item} setResultData={setResultData} />
                                    </div>


                                    <div onMouseDown={() => getAllData(item)}>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                            <div className='flex justify-between'><span className='font-normal'>Ulke:</span><span className='font-semibold'>{item.country}</span></div>
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                            <div className='flex justify-between'><span className='font-normal'>Sehir:</span><span className='font-semibold'>{item.city}</span></div>
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                            <div className='flex justify-between'><span className='font-normal'>Ilce:</span><span className='font-semibold'>{item.state}</span></div>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {checkLoading?.status === 200 ? <div>
                    <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
                        <div className="flex flex-col justify-between h-[190px] w-full leading-normal relative" onClick={() => handleOpen("sm")}>
                            <div className='absolute top-0'>
                                <Tooltip content="Tesis Ekleyin" placement="right" style={{ color: "red", zIndex: "0" }}>
                                    <button className='flex justify-center items-center relative z-3320' style={{ height: '140px', width: '240px', borderRadius: '20px' }}></button>
                                </Tooltip>
                            </div>
                            <div style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%', fontSize: '40px' }} className='absolute  translate-x-1/2  translate-y-2/4' > +</div>
                        </div>
                    </a>
                </div> : <Skeleton height={'190px'} baseColor='#ebebeb' />
                }

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
                className="max-w-2xl mx-auto  bg-white font-sans text-base leading-6 font-normal"

                open={size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl" || size === "xxl"}

                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader className='text-center relative' style={{ display: 'block' }}>Tesis Bilgilerinizi Girin</DialogHeader>
                <DialogBody className='max-h-[50vh] overflow-y-auto'>
                    <div className="grid grid-cols-1" >
                        <div>
                            <div className="flex  xsm:mt-0 flex-col items-center bg-white mx-auto w-full border-gray-200  md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 ">
                                <div className="flex flex-col justify-between p-4 w-full leading-normal" >

                                    <div className="mt-4">
                                        {/* Latitude ve Longitude için input alanları */}
                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                            <p className="mr-2 mb-1 font-semibold md:mb-0 self-start md:self-center">Enlem:</p>
                                            <input
                                                type="text"
                                                value={data.latitude ?? "Enlem"}
                                                onChange={(e) => changeSave(e, "latitude")}
                                                className="border border-stroke rounded p-2 w-full md:w-[360px]"
                                                placeholder="Enlem"
                                            />
                                        </div>


                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                            <p className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Boylam:</p>
                                            <input
                                                type="text"
                                                value={data.longitude ?? "Boylam"}
                                                onChange={(e) => changeSave(e, "longitude")}
                                                className="border border-stroke rounded p-2 w-full md:w-[360px]"
                                                placeholder="Boylam"
                                            />
                                        </div>
                                    </div>
                                    <Button className='mt-3' onClick={getLocation} color="blue">Konumu Al</Button>
                                    <p className="mt-3 font-normal text-gray-700 dark:text-gray-400 block w-full ">
                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">

                                            <label className="mr-2 mb-1 font-semibold md:mb-0 self-start md:self-center">Ülke Kodu Seçin:</label>
                                            <CountryDropdown
                                                value={selectedCountry}
                                                onChange={(country) => {
                                                    // Seçilen ülkenin kodunu (ISO3) elde et
                                                    const countryCode = country?.target?.dataset?.iso3;

                                                    // selectedCountry'yi güncelle
                                                    setSelectedCountry(countryCode);

                                                    // CityCode'u güncellemek için changeSave fonksiyonunu çağır
                                                    changeSave({ target: { name: 'CityCode', value: countryCode } });
                                                    console.log("kod---------", countryCode)
                                                }}
                                                id="country"
                                                clearable
                                                searchable
                                                native={false} // Bayrakları göster
                                                priority={["TR"]} // Sadece Türkiye'yi göster
                                            />
                                        </div>
                                        {/* <div>Seçilen Ülke Kodu: {selectedCountry}</div> */}

                                    </p>
                                    <p className="mt-3 font-normal text-gray-700 dark:text-gray-400 block w-full ">

                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                            <label className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Firma Faliyet Alanı:</label>
                                            <select
                                                className="border border-stroke rounded p-2 w-full md:w-[360px]"
                                                name="FieldActivity" // name alanı ekleyerek state'e kaydedilecek alanı belirleyelim
                                                value={data.FieldActivity} // value ile seçilen değeri bağla
                                                onChange={changeSave} // onChange'e changeSave fonksiyonunu bağla
                                            >
                                                <option>Faliyet alanı seçin</option>
                                                <option>Iron & steel production</option>
                                                <option>Construction</option>
                                                <option>Software Development</option>
                                                {/* Buraya diğer seçenekleri de ekleyebilirsin */}
                                            </select>

                                        </div>
                                        {/* <div>Seçilen Ülke Kodu: {selectedCountry}</div> */}

                                    </p>

                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                            <span className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Çalışan Sayısı:</span>

                                            <input
                                                type='number'
                                                value={data.employeecount}
                                                name='employeecount'
                                                onChange={changeSave}
                                                placeholder='Çalışan sayınızı girin'
                                                className="border border-stroke rounded p-2 w-full md:w-[360px]"
                                            />
                                        </div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 block w-full ">
                                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                            <span className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Toplam Kapali Alan:</span>
                                            <input
                                                type='number'
                                                value={data.totalarea}
                                                name='totalarea'
                                                onChange={changeSave}
                                                placeholder='Kapasitenizi girin  /m2'
                                                className="border border-stroke rounded p-2 w-full md:w-[360px]"
                                            />
                                        </div>
                                    </p>
                                    <div className="" >
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-fll">

                                            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                                <span className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Ülke:</span>
                                                <CountryDropdown
                                                    clearable
                                                    searchable
                                                    value={country}
                                                    placeHolder='Ülke seçin'
                                                    priority={['TR']}
                                                    native='false'
                                                    onChange={handleSetCountry}
                                                    className=''
                                                />
                                            </div>
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">

                                            <div className="flex flex-col md:flex-row justify-between items-center w-full">

                                                <span className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">Şehir:</span>
                                                <StateDropdown
                                                    clearable
                                                    placeHolder='Şehir seçin'
                                                    searchable
                                                    country={country}
                                                    value={state}
                                                    onChange={handleSetState}
                                                />

                                            </div>
                                        </p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">

                                            <div className="flex flex-col md:flex-row justify-between items-center w-full">

                                                <span className="mr-2 mb-1 mt-2 font-semibold md:mb-0 self-start md:self-center">İlçe:</span>
                                                <CityDropdown
                                                    className=''
                                                    clearable
                                                    searchable
                                                    placeHolder='İlçe seçin'
                                                    // allowFreeFormText
                                                    country={country}
                                                    state={state}
                                                    value={dropcity}
                                                    onChange={handleSetCity}
                                                />
                                            </div>
                                            <div className='flex justify-between w-full mt-4 items-center'>
                                                <input
                                                    type='text'
                                                    value={data.facilityname}
                                                    name='facilityname'
                                                    onChange={changeSave}
                                                    placeholder='Tesis ismi girin'
                                                    className='w-full rounded border h-11 border-[#ccc] bg-gray py-1 mt-0 pl-2 pr-1.5 text-black focus:border-[#96c8da] bg-transparent focus-visible:outline-none dark:border-strokedark dark:text-white  ' />

                                            </div>
                                            {/* Date Picker */}
                                            {/* Tarih Seçici (Start Date) */}

                                            <p className='mt-3'>
                                                <i className="fa-solid fa-triangle-exclamation me-3 2xsm:text-sm xsm:text-2xl" style={{ color: '#f1c40f' }}></i>
                                                Konum bilgisi alırken tesisiniz bulunduğu alandan almanız gerekmektedir.</p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </DialogBody>
                <DialogFooter className=' xsm:mt-0'>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 gap-2 mx-3 rounded"
                    >
                        İptal Et
                    </Button>

                    <Button
                        className="flex items-center mx-3 gap-2 px-4 py-2 text-white rounded shadow-lg"
                        style={{
                            background: "linear-gradient(to right, rgb(0, 255, 142), rgb(0, 160, 254))",
                        }}

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