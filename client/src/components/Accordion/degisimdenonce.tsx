import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import Facility from "../Facility/index"
import DataPicker from "../../common/DataPicker/index"
import { useEffect, useState } from "react";
import { post } from "../../server/Apiendpoint"
import Deneme from "./deneme"



const Icon = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const AccordionCustomIcon = () => {


  const Countries = [
    {
      id: 1,
      name: "Scope-1",
      states: [
        {
          name: "SABIT YANMA",
          cities: ["Doğal Gaz", "Fleoil 2", "Fleoil 6","Gazyağı","Sıvılaştırılmış Petrol Gazları (LPG)","Antrasit Kömür","Bitümlü Kömür","Alt Bitümlü Kömür","Linyit Kömürü","Kok komuru","Belediye Katı Atıkları","Petrol Kökü","Plastik","Lastik","Yaş Biokütle","Turba","Kuru Biokutle","Ahşap ve Ahşap Kalıntıları","Propan Gazı","Çöp Gazı","Biyodizel (%100),","Etanol (%100)","İşlenmiş Hayvansal Yağ","Bitkisel Yağ"],
          units: ['kg', 'ton', 'lt']
        },
        {
          name: "HAREKETLI YANMA",
          cities: ["Jet Yakıtı(Benzinli)", "Sıkıştırılmış Doğal Gaz (CNG)", "Dizel Yakıt","Etanol","Gazyağı Tipi Jet Yakıtı","Sıvılaştırılmış Doğal Gaz (LNG)","Sıvılaştırılmış Petrol Gazları (LPG)","Benzin","Artık Akaryakıt"],
          units: ['scope-1', 'ton', 'lt']
        },
        {
          name: "DOGRUDAN SIZMA KACAK EMISYONU",
          birim: ['CH4', 'N20','R22','R134a','R404A','CO2','R410A','R32','R407C','R600A'],
          cities: ["Su Sebili", "Buzdolabi","Chiller","Klima","Yangın Söndürme Tüpü","Endüstriyel Soğutucu"],
          units: ['kg', 'ton', 'lt']
        },

      ],
    },
    {
      id: 2,
      name: "Scope-2",
      states: [
        {
          name: "Satın Alınan Enerji",
          cities: ["elektrik"],
          units: ['megaWatt', 'kWawt']
        },
      ],
    },
    {
      id: 3,
      name: "Scope-3",
      states: [
        {
          name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
          cities: ["Minibüs", "Otobüs", "Pazarlama", "Nakliye"],
          units: ['dizel', 'lpg'],
          birim: ['lt', 'ton']

        },
        {
          name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
          cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
          option:["otobus icin yakit tuketimi","otelde kisi sayisi","taksi ile mi arac kiralama mi"],
          units: ['dizel', 'lpg'],
          birim: ['lt', 'ton']

        },

      ],
    },
  ];


  const [units, setUnits] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [citiy, setCitiy] = useState()
  const [cities, setCities] = useState([])
  const [birim, setBirim] = useState([])
  const [states, setStates] = useState([]);
  const [open, setOpen] = useState();
  const [alldata, setAlldata] = useState([]);
  const [input, setInput] = useState({ amount: "" })
  const [sakla1, setSakla1] = useState({ cities: '' })
  const [sakla2, setSakla2] = useState({ units: '' })
  const [sakla3, setSakla3] = useState({ amount: '' })
  const [sakla4, setSakla4] = useState({ birim: '' })
  const [ver,setVer]=useState(false)
  const [sub, setSub] = useState({ name1: '', name2: '', name3: '', name4: '' })
  const [degis, setDegis] = useState(false)
  const [gg,setGg] = useState(false)
  const [date,setDate] = useState({startDate:'',endDate:''})
  const [bigdata,setBigdata] = useState([])
  const [car,setCar] = useState([])
  // {
  //   startDate:'',endDate:'',ulke:'',sehir:'',tesis:'',ilce:'',
  //   kapsam1:[{name:'sabit',veri:[]},{name:'hareketli',veri:[]},{name:'dogrudan',veri:[]}],
  //   kapsam2:[{name:'elektrik',veri:[]}],
  //   kapsam3:[{name:'upstream',veri:[]},{name:'downstream',veri:[]}]
  // }


  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const today = new Date();

  const reset = (initialValue = 0) => {
    setAlldata(initialValue)
  }

  const changeCountry = (event) => {
    
    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === "Scope-1").states);

    if (event.target.value === 'Scope-1') {
     
      handleOpen(1)
      setDegis(false)
      const result = alldata.find(({ title }) => title === 'SCOPE-1')
      if (!result) {
        setGg(false)
        setVer(false)
        setAlldata([...alldata, { "date": today }, { "title": event.target.textContent }])
      }

    }
    else if (event.target.value === 'Scope-2') {
      handleOpen(2)
      setGg(false)
      setDegis(false)
      setVer(false)
      setStates(Countries.find((ctr) => ctr.name === "Scope-2").states);
      

    }
    else if (event.target.value === 'Scope-3') {
      handleOpen(3)
      setStates(Countries.find((ctr) => ctr.name === "Scope-3").states);
      setBirim(states.find((state) => state).birim);
      // setBirim([...alldata, { "birim": event.target.value }])
      // setBirim(states.find((state) => state).birim);
    }

  };

  // const handleChange = (e) => {
  //   setSakla3({
  //     ...sakla3,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const changeState = (event, index) => {

   if (event.target.id==="Scope-3") {
    if (event.target.textContent[0] === "U") {
      setVer(false)
      setGg(true)
      setDegis(true)
      setCities(states.find((state) => state.name === event.target.textContent).cities);
    setUnits(states.find((state) => state.name === event.target.textContent).units);
    setBirim(states.find((state) => state.name === event.target.textContent).birim);
      setSub({ name1: 'Araç Türü', name2: 'Yakıt Türü', name3: 'Birim', name4: 'Miktar' })

    }
    else if (event.target.textContent[0] === "D") {
      
      setDegis(false)
      setVer(true)
      setGg(false)
      setSub({ name1: 'Ulaşım Türü', name2: 'Yakıt Türü', name3: 'Birim', name4: 'Miktar' })
    }
   }
   else if(event.target.id==="Scope-2"){
    setCities(states.find((state) => state.name === event.target.textContent).cities);
    setUnits(states.find((state) => state.name === event.target.textContent).units);
    setBirim(states.find((state) => state.name === event.target.textContent).birim);
    setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

   }
   else if(event.target.id === "Scope-1"){
    if (event.target.textContent[0] === "S" || "H" || "D") {
      setCities(states.find((state) => state.name === event.target.textContent).cities);
      setUnits(states.find((state) => state.name === event.target.textContent).units);
      setBirim(states.find((state) => state.name === event.target.textContent).birim);
      setDegis(false)
      setGg(false)
      setVer(false)
    }

    setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

   }
   
   else{
    setCities(states.find((state) => state.name === event.target.textContent).cities);
    setUnits(states.find((state) => state.name === event.target.textContent).units);
    setBirim(states.find((state) => state.name === event.target.textContent).birim);




    setAlldata([...alldata, { "subtitle": event.target.textContent }])
   }
  }
  const handleAdd = ()=>{

  }

  const handleSubmit = async (e) => {

    setAlldata([...alldata, sakla3])
    atis()
  }

  const atis = async () => {

    var selam22 = alldata.reduce(
      (obj, item) => Object.assign(obj, item));

    const loginuser = await post("/calculation", selam22)
    console.log(loginuser)
  }

  const changeData = (event) => {
    console.log("kara sevda",event.target.value)
    setCar([...car,{"aracturu":event}])
    setAlldata([...alldata, { "cities": event.target.value }])
    if (event.target.value === "Buzdolabi") {
      setDegis(true)
      setSub({ name1: 'Cihaz Adı', name2: 'Birim', name3: 'Gaz Cinsi', name4: 'Miktar' })
      setCities(states.find((state) => state.name === event.target.textContent).cities);
      setUnits(states.find((state) => state.name === event.target.textContent).units);
      setBirim(states.find((state) => state.name === event.target.textContent).birim);
    }
    else if(event.target.value === "Minibüs" || "Otobüs" || "Pazarlama" || "Nakliye" ){
        console.log("ezzz")
    }
    else {


      setDegis(false)
      setGg(false)
      setVer(false)
    }
  }

    const getData = (value1)=>{
        setBigdata([...bigdata, { "StartDate": value1}])

        // console.log("dateeeee",date)
        // setBigdata(startDate:date.startDate)
        console.log("bigbig",value1)
        console.log("DENEME",bigdata)

      
    }
    const getUlke = (valuee) =>{
      // setBigdata([...bigdata,{valuee}])

      // console.log("bigbigbig",valuee)

    }


  return (



    <div >
      <Facility facilityData={getUlke} />
      <div className='border border-slate-300 rounded-2xl  p-5 '>
        <div className='grid grid-cols-3 gap-4'>
          <div className=" border border-slate-300 rounded-2xl bg-neutral-200">
            <div className="px-4">
              <div className="flex flex-col my-4">
                <span>Step 1</span>
                {/* <span>SCOPE & SUBCATEGORY SELECTION</span> */}
              </div>
              <hr />
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={changeCountry} value='Scope-1'>KAPSAM 1</AccordionHeader>
                <AccordionBody className='px-3' value={state}>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      <option>Select souttrce</option>
                      {states.map((state, index) => (
                        <button onClick={changeState} id='Scope-1' key={index} className="my-3 bg-sky-300 p-2 rounded-md" style={{ display: "block",width:"100%" }}>{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={changeCountry} value='Scope-2'>
                  KAPSAM 2
                </AccordionHeader>
                <AccordionBody>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      <option>Select souttrce</option>
                      {states.map((state, index) => (
                        <button onClick={changeState} id='Scope-2' key={index} className="my-3 bg-sky-300 p-2 rounded-md" style={{ display: "block",width:"100%" }}>{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={changeCountry} value='Scope-3'>
                  KAPSAM 3
                </AccordionHeader>
                <AccordionBody>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      {/* <option>Select souttrce</option> */}
                      {states.map((state, index) => (
                        <button onClick={(event) => changeState(event)} id='Scope-3' key={index} className="my-3 bg-sky-300 p-2 rounded-md" style={{ display: "block",width:"100%" }}>{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>
            </div>
          </div>
          <div className="col-span-2 bg-neutral-200 rounded-2xl border-slate-300 border">
            <div className='p-3'>
              <div className='flex flex-col'>
                <span>Step 2 </span>
                {/* <span>EMISSIN SOURCE SELECTION:<span>SCOPE 1/STATIONARY COMBUSTION</span></span> */}
              </div>
              <hr className='my-4' />
             {
              ver ? <Deneme/> : 
              <div className="start">
              <div className='grid grid-cols-2'>
                <DataPicker deneme={getData}/>
              </div>

              {/* form start */}
              <form>
                <div className='grid grid-cols-4 gap-3 my-5'>
                  <div className="block w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>{sub.name1 === '' ? 'Emission Source' : sub.name1}</label>
                    <select value={sakla1.cities} id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                      onChange={(event) => changeData(event)}>
                      {/* onChange={(event) => setAlldata([...alldata, { "cities": event.target.value }])}> */}
                      {cities?.map((citiy, index) => (
                        <option key={index}>{citiy}</option>
                      ))}
                    </select>
                  </div>

                  <div className="block w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name2 === '' ? 'Birim' : sub.name2}</label>
                    <select value={sakla2.units} id="units" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                      onChange={(event) => setAlldata([...alldata, { units: event.target.value }])}>
                      {units?.map((citiy, index) => (
                        <option key={index}>{citiy}</option>
                      ))}
                    </select>
                  </div>
                  {
                    degis ? <div className="block w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name3 === '' ? 'bos' : sub.name3}</label>
                      <select value={sakla4.birim} id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                        onChange={(event) => changeCountry(event)}>
                        {birim?.map((citiy, index) => (
                          <option key={index}>{citiy}</option>
                        ))}
                      </select>
                    </div> : null
                  }
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sub.name4 === '' ? 'Amount' : sub.name4}</label>
                    <input
                      type="text"
                      value={alldata.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Jdfohn"
                      required
                      name='amount'
                      onChange={(event) => setAlldata([...alldata, { amount: event.target.value }])}
                    />
                  </div>
                </div>
              </form>
              </div>
             }
              {/* form end */}
              <hr className='mt-3' />
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">

                {
                  gg ? 
                  
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
                      Araç Ekle
                      {/* <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
                    </caption>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Araç Türü
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Yakıt Türü
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Birim
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Miktar
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
            </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                          Silver
                        </td>
                        <td class="px-6 py-4">
                          Laptop
                        </td>
                        <td class="px-6 py-4">
                          $2999
                        </td>
                        {/* <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td> */}
                      </tr>
                     
                     
                    </tbody>
                  </table> : null
                }
              </div>

              <div className='flex justify-end mt-4'>
                <button
                  onClick={(e) => handleAdd(e)}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{degis ? "Ekle" : "Kaydet"}</button>
                {
                  gg?  <button
                  onClick={(e) => handleSubmit(e)}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{degis ? "Kaydet" : "Kaydet"}</button>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Deneme/> */}

    </div>
  );
}
export default AccordionCustomIcon




