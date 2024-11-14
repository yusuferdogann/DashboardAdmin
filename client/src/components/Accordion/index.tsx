import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import Facility from "../Facility/index"
import DataPicker from "../../common/DataPicker/index"
import { useEffect, useState } from "react";
import { post } from "../../server/Apiendpoint"
import PersonalCar from "../Calculatıon/PersonalCar"
import ServiceCar from "../Calculatıon/ServiceCar"
import EmployeeCar from "../Calculatıon/EmployeeCar"
import TravelCar from "../Calculatıon/TravelCar"
import Videokayit from '../../../src/images/video/animation-video.mp4'
// import Language from "../Facility/languagetest"
import { Tooltip, Button } from "@material-tailwind/react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { userAuth } from '../../auth/userAuth';
import { Tabs, TabsHeader,  Tab,  } from "@material-tailwind/react";
import { handleErrorForFacility } from '../../common/utils/helpers'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../common/utils/helpers';







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
  const [veri, setVeri] = useState()
  const [veri2,setVeri2] = useState([])
  const styles = {
    input: {
      normal: 'bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'
    },
    select: {
      normal: 'h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-1 px-4 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'

    }
  }
  const [statescope3, setStateScope3] = useState('personal')

  const Countries = [
    {
      id: 1,
      name: "SCOPE-1",
      states: [
        {
          id: 1,
          name: "SABIT YANMA",
          short: ['sabit'],
          cities: ["Doğal Gaz", "Fleoil 2", "Fleoil 6", "Gazyağı", "Sıvılaştırılmış Petrol Gazları (LPG)", "Antrasit Kömür", "Bitümlü Kömür", "Alt Bitümlü Kömür", "Linyit Kömürü", "Kok komuru", "Belediye Katı Atıkları", "Petrol Kökü", "Plastik", "Lastik", "Yaş Biokütle", "Turba", "Kuru Biokutle", "Ahşap ve Ahşap Kalıntıları", "Propan Gazı", "Çöp Gazı", "Biyodizel (%100),", "Etanol (%100)", "İşlenmiş Hayvansal Yağ", "Bitkisel Yağ"],
          units: ['kg', 'ton', 'lt', 'm3']
        },
        {
          id: 2,
          name: "HAREKETLI YANMA",
          short: ['hareketli'],
          cities: ["Jet Yakıtı(Benzinli)", "Sıkıştırılmış Doğal Gaz (CNG)", "Dizel Yakıt", "Etanol", "Gazyağı Tipi Jet Yakıtı", "Sıvılaştırılmış Doğal Gaz (LNG)", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin", "Artık Akaryakıt"],
          units: ['SCOPE-1', 'ton', 'lt', 'm3']
        },
        {
          id: 3,
          name: "DOGRUDAN SIZMA KACAK EMISYONU",
          short: ['dogrudan'],
          birim: ['CH4', 'N20', 'R22', 'R134a', 'R404A', 'CO2', 'R410A', 'R32', 'R407C', 'R600A'],
          cities: ["Su Sebili", "Buzdolabi", "Chiller", "Klima", "Yangın Söndürme Tüpü", "Endüstriyel Soğutucu"],
          units: ['kg', 'ton', 'lt', 'm3']
        },

      ],
    },
    {
      id: 2,
      name: "SCOPE-2",
      states: [
        {
          id: 1,
          name: "Satın Alınan Enerji",
          cities: ["elektrik"],
          units: ['megaWatt', 'kWawt']
        },
      ],
    },
    {
      id: 3,
      name: "SCOPE-3",
      states: [
        {
          id: 1,
          name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
          cities: ["Minibüs", "Otobüs", "Pazarlama", "Nakliye"],
          units: ['dizel', 'lpg'],
          birim: ['lt', 'ton', 'm3']

        },
        {
          id: 2,
          name: "Downstream Nakliye hizmetin dışardan satın alınması durumunda)",
          cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
          option: ["otobus icin yakit tuketimi", "otelde kisi sayisi", "taksi ile mi arac kiralama mi"],
          units: ['dizel', 'lpg'],
          birim: ['lt', 'ton', 'm3']

        },

      ],
    },
  ];
  const bigbig = [
    {
      id: 1,
      kapsam1name: '',
      state1: []
    }

  ]
  const Data = [
    {
        label: "Şahsi Araçlar",
        value: "personal",
    },
    {
        label: "Servis Araçlar",
        value: "service",
    },
    {
        label: "Müşteri Ziyaretleri",
        value: "employee"
    },
    {
      label: "İş Seyahatleri",
      value: "business"
  },
  

];

const ResultTravel = [];
Data.map((value)=>{
  // console.log(value.value)
  ResultTravel.push(value.value)

})
// console.log("sonuc------------",ResultTravel[3])
  const { facilitySend,token } = userAuth();

  const [units, setUnits] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [citiy, setCitiy] = useState('')
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
  const [ver, setVer] = useState(false)
  const [sub, setSub] = useState({ name1: '', name2: '', name3: '', name4: '' })
  const [degis, setDegis] = useState(false)
  const [gg, setGg] = useState(false)
  const [travelCarControl,setTravelCarControl] = useState(false)
  const [holdLabelScope,setHoldLabelScope] = useState('')
  const [date, setDate] = useState({ startDate: '', endDate: '' })
  const [todos, setTodos] = useState([
    { id: 1, title: '', subtitle: '', sabit: ["sab"], hareketli: ['har'], dogrudan: ['dog'] },
    { id: 2, title: '', subtitle: '', elektrik: ['ele'] },
    { id: 3, title: '', subtitle: '', upstream: ['gg'], downstrem: ['rr'] }
  ]);

  var currentdate = new Date(); 
  var datetime =    currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " - "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":"
                  + currentdate.getMilliseconds()
  // console.log("date-time",datetime)

  const [savedData, setSavedData] = useState(
    { 
      tarih:datetime,
      title: '', 
      subtitle: '', 
      kaynak: '', 
      birim: '', 
      miktar: '',
      ulke:facilitySend?.country,
      sehir:facilitySend?.city,
      ilce:facilitySend?.state,
      tesis:facilitySend?.facilityname,
      situation:''
     }
  );
  const [savedDataScope3, setSavedDataScope3] = useState(
    { 
      tarih:datetime,
      title: '', 
      subtitle: '', 
      kaynak: '', 
      yakitturu:'',
      birim: '', 
      miktar: '',
      ulke:facilitySend?.country,
      sehir:facilitySend?.city,
      ilce:facilitySend?.state,
      tesis:facilitySend?.facilityname,
      situation:''
     }
  );
  const [scope3DownTitle,setScope3DownTitle] = useState('')

  const [savedDataScope4, setSavedDataScope4] = useState(
    { 
      tarih:datetime,
      title: 'SCOPE-3', 
      subtitle: 'Downstream Nakliye hizmetin dışardan satın alınması durumunda)', 
      plaka: '', 
      yakitturu:'',
      birim: '', 
      miktar: '',
      ulke:facilitySend?.country,
      sehir:facilitySend?.city,
      ilce:facilitySend?.state,
      tesis:facilitySend?.facilityname,
      situation:'',
      type:'Şahsi Araçlar'
     }
  );

  const initialValues = {kaynak:savedData.kaynak,birim:savedData.birim,miktar:savedData.miktar,situation:savedData.situation}
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false)
  const [listData,setListData] = useState([])
  const [addList,setAddList] = useState({kaynak:'',birim:'',situation:'',miktar:''})
  const [aracdata, setAracdata] = useState([])
  const [car, setCar] = useState({ aracturu: '', yakitturu: '', birim: '', miktar: '' })
  const [dublicate,setDublicate] = useState(false)

  //     setAracdata([...aracdata,{car}])


  // TR Format date - time=======================================
  // const options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // };
  // const date_input = new Date()
  // const formatter = ms => new Date( ms )
  //   .toLocaleDateString("tr-TR", options )
  //   .replace( / /g, '-' );
    
  // const invalid_str = formatter( date_input );
  // console.log( invalid_str );
  
  // const valid_str = formatter( parseInt( date_input, 10));
  // console.log( valid_str );
  // =============================================================


  // const [todos, setTodos] = useState([{ id: 1, title: "", data: [] }]);
  const [baslik, setBaslik] = useState()
  const [subtitle, setSubtitle] = useState([])
  const [short, setShort] = useState([])
  const [loadingData, setLoadingData] = useState({ kaynak: '', birim: '', miktar: '' })
  const [baslikvalue, setBaslikvalue] = useState('')
  const [load, setLoad] = useState(false)
  const [textControl,setTextControl] = useState(false)
  const [id, setId] = useState()
  const [scope1, setScope1] = useState("")
  const [scope2, setScope2] = useState("")
  const [scope3, setScope3] = useState("")
  const [baslik1, setBaslik1] = useState("")
  const [baslik2, setBaslik2] = useState("")
  const [baslik3, setBaslik3] = useState("")
  const [datasub, setDatasub] = useState('')
  const [videopen, setVideopen] = useState(false)
  const [error,setError] = useState(false)
  const [change,setChange] = useState(false)


  // function handleTitle(value,id){
  //   setTodos(...todos,
  //     todos.find((gg)=>gg.id===id)
  //      ? gg.title === value : todos
  //   )
  // }
  // backendden donus =======================
  // bi sonraki gun backende gonderilecek blgi revize edildi data yapisi degistirildi
  const backendSendDataT = (data) => {
    setSavedData(
      savedData.find((p) => p.id === 1)
        ? savedData.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: data,
              subtitle: p.data,
              data:p.data
            }
            : p
        )
        : savedData
    );
  }
  const backendSendDataS = (data) => {
    setSavedData(
      savedData.find((p) => p.id === 1)
        ? savedData.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              subtitle: data,
              data:p.data
            }
            : p
        )
        : savedData
    );
  }
  const backendSendDataD = (veri) => {
    setSavedData(
      savedData.find((p) => p.id === 1)
        ? savedData.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              subtitle: p.subtitle,
              data: [...p.data,{ kaynak: veri.kaynak, birim: veri.birim,miktar:veri.miktar}],

            }
            : p
        )
        : savedData
    );
  }
  // console.log("saved-SUB",savedData)
  // ========================================
  


  function handleTitle(title) {
    setTodos(
      todos.find((p) => p.id === 1)
        ? todos.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: title,
              subtitle: '',
              sabit: p.sabit,
              hareketli: p.hareketli,
              dogrudan: p.dogrudan
            }
            : p
        )
        : todos
    );
    // console.log(todos);
  }
  function handleSubTitle(sub) {
    setTodos(
      todos.find((p) => p.id === 1)
        ? todos.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              subtitle: sub,
              sabit: p.sabit,
              hareketli: p.hareketli,
              dogrudan: p.dogrudan
            }
            : p
        )
        : todos
    );
    // console.log("sub-title",todos)
  }

  function handleSabit(car) {
    setTodos(
      todos.find((p) => p.id === 1)
        ? todos.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              subtitle: p.subtitle,
              hareketli: p.hareketli,
              dogrudan: p.dogrudan,
              sabit: [...p.sabit, { id: 1, title: car }],
            }
            : p
        )
        : todos
    );

  }

  function handleDogrudan(car) {
    setTodos(
      todos.find((p) => p.id === 3)
        ? todos.map((p) =>
          p.id === 3
            ? {
              id: 3,
              title: p.title,
              subtitle: p.subtitle,
              hareketli: p.hareketli,
              sabit: p.sabit,
              dogrudan: [...p.dogrudan, { id: 1, title: car }],
            }
            : p
        )
        : todos
    );

  }
  function handleHareketli(car) {
    setTodos(
      todos.find((p) => p.id === 1)
        ? todos.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              subtitle: p.subtitle,
              dogrudan: p.dogrudan,
              sabit: p.sabit,
              hareketli: [...p.hareketli, { id: 1, title: car }],
            }
            : p
        )
        : todos
    );

  }
  function handleSub(value1) {
    setTodos(
      todos.find((p) => p.id === 1)
        ? todos.map((p) =>
          p.id === 1
            ? {
              id: 1,
              title: p.title,
              title: [...p.title, { id: 1, title: value1 }],
            }
            : p
        )
        : todos
    );

    // console.log(todos);
  }

  // {
  //   startDate:'',endDate:'',ulke:'',sehir:'',tesis:'',ilce:'',
  //   kapsam1:[{name:'sabit',veri:[]},{name:'hareketli',veri:[]},{name:'dogrudan',veri:[]}],
  //   kapsam2:[{name:'elektrik',veri:[]}],
  //   kapsam3:[{name:'upstream',veri:[]},{name:'downstream',veri:[]}]
  // }

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const today = new Date();

  const changeCountry = (event) => {
    setScope1(false)
    setId(false)
    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === "SCOPE-1").states);
    setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

    if (event.target.value === 'SCOPE-1') {
      setSavedDataScope3({ 
        tarih:datetime,
        title: '', 
        subtitle: '', 
        kaynak: '', 
        yakitturu:'',
        birim: '', 
        miktar: '',
        ulke:facilitySend?.country,
        sehir:facilitySend?.city,
        ilce:facilitySend?.state,
        tesis:facilitySend?.facilityname,
        situation:''
       })
       setBaslik3('')
      console.log("Click Scope1 after Scope3-----------------",savedDataScope3)

      if(facilitySend?.country === undefined || facilitySend?.country === ""){
        setVideopen(false)

        return handleErrorForFacility("Lütfen kayıt yapmadan önce Tesisler sekmesinden tesis seçin veya yeni bir tesis ekleyin")
      }
      else{
        setVideopen(true)
      }
      setBaslik1(event.target.value)
      console.log("title-Scope-1-------------",baslik1)
      setBaslikvalue('TESİSTE ISINMA VE ÜRETİM AMACIYLA KULLANILAN ENERJİ TÜRLERİ')
      setStates(Countries.find((ctr) => ctr.name === "SCOPE-1").states);
      // setShort(states.find((ctr) => ctr.short===ctr.short).short);


      // handleTitle(event.target.value,1)
      handleTitle(event.target.value)
      setSavedData({...savedData,"title":event.target.value})
      //setKapsamdetail([...kapsamdetail,{"kapsambasligi":event.target.textContent}])
      //  console.log("first",todos) 
      // todos.filter((item)=>{
      //   if (item.id===1) {
      //       setTodos([...todos,item.title=event.target.value])
      //       console.log("first",todos)
      //   }
      //   else{
      //     return false
      //   }
      // })      

      // console.log("todos", todos)
      // console.log("baslik uptaded",todos)
      // const check = kapsamdetail.filter(({ kapsambasligi }) => kapsambasligi === 'KAPSAM 1');
      // let isKeyPresent = kapsamdetail.some(el => {
      //   if(!el.hasOwnProperty('kapsambasligi'))
      //     return true
      // })
      // const check = kapsamdetail.every(({ kapsambasligi }) => {
      //   if (kapsambasligi=== 'KAPSAM 1') {
      //     setKapsamdetail([...kapsamdetail,{"kapsambasligi":event.target.textContent}])

      //   }
      //   else(null)
      // });
      // console.log("check",check)
      // console.log("kapsambasligi",kapsamdetail)

      // ==========================================================================================================
      // let isKeyPresent = kapsamdetail.some(el => {
      //   if(el.hasOwnProperty('kapsam1'))
      //     return true
      // })
      // if (isKeyPresent===false) {
      //   setKapsamdetail([...kapsamdetail,{"kapsambasligi":event.target.textContent}])
      // }
      // else{null}     
      // setKapsamdetail(...kapsamdetail,kapsamdetail.find(o=>o.kapsam1name==='selam'))
      // console.log("vesvesves",kapsamdetail)

      // console.log("eskiobject",kapsamdetail)
      // const ff = kapsamdetail?.map((cc)=>console.log("cc",cc.kapsam1.find(o=>o.state1.push(event.target.value))))
      // const ff = bigbig.find(x=>x.id === 1)
      // setKapsamdetail(...kapsamdetail,ff)

      // setKapsamdetail(ff.state2=[...ff.state2,{anme:'df'}])

      // console.log('isKeyPresent', ff);
      // ============================================================================================================
      // setKapsamdetail(...kapsamdetail,kapsamdetail.state1=[...kapsamdetail.state1,{dfdf:'df'}])
      // console.log("kapsambasligi", kapsamdetail.state1)


      handleOpen(1)
      setDegis(false)
      const result = alldata.find(({ title }) => title === 'SCOPE-1')
      if (!result) {
        setGg(false)
        setVer(false)
        setAlldata([...alldata, { "date": today }, { "title": event.target.textContent }])
      }

    }
    else if (event.target.value === 'SCOPE-2') {
      setScope2(false)
      setId(false)
      // setBaslik2('')
      setBaslik2(event.target.value)
      console.log("title-Scope-2---------------",baslik2)

      handleOpen(2)
      setGg(false)
      setDegis(false)
      setVer(false)
      setSavedData({...savedData,"title":event.target.value})
      console.log("SCOPE-2-saved-data",savedData)


      if(facilitySend?.country === undefined || facilitySend?.country === ""){
        setVideopen(false)
        handleOpen(false)
        return handleErrorForFacility("Lütfen kayıt yapmadan önce Tesisler sekmesinden tesis seçin veya yeni bir tesis ekleyin")
      }
      else{
        setVideopen(true)
        handleOpen(2)
      }
      handleTitle(event.target.value)
      setBaslikvalue('TESİS BÜNYESİNDE KAYITLI ARAÇLARIN KULLADIĞI YAKITLAR')
      // console.log("bassssss2", baslik)

      setStates(Countries.find((ctr) => ctr.name === "SCOPE-2").states);


    }
    else if (event.target.value === 'SCOPE-3') {
      // console.log("opennnn", open)
      setSavedData( { 
        tarih:datetime,
        title: '', 
        subtitle: '', 
        kaynak: '', 
        yakitturu:'',
        birim: '', 
        miktar: '',
        ulke:facilitySend?.country,
        sehir:facilitySend?.city,
        ilce:facilitySend?.state,
        tesis:facilitySend?.facilityname,
        situation:''
       })

     
       console.log("scopsdsde-3",savedDataScope3)

       console.log("scope-3---------",baslik3)
      setBaslik(event.target.value)
      setSavedData({...savedData,"title":event.target.value})
      setSavedDataScope3({...savedDataScope3,"title":event.target.value})
      setBaslik3(event.target.value)
      // console.log("Baslik-3----",baslik3)
      // console.log("Baslik-----",baslik)
      // console.log("Baslik-1----",baslik1)
      // console.log("Baslik-2----",baslik2)
      setBaslik1('')
      setBaslik2('')
      // console.log("Baslik-1-After----",baslik1)
      // console.log("Baslik-2-After----",baslik2)


      if(facilitySend?.country === undefined || facilitySend?.country === ""){
        setVideopen(false)
        setStates(Countries.find((ctr) => ctr.name === "SCOPE-3").states);
        setBirim(states.find((state) => state).birim);
        handleOpen(false)
        return handleErrorForFacility("Lütfen kayıt yapmadan önce Tesisler sekmesinden tesis seçin veya yeni bir tesis ekleyin")
      }
      else{
        handleOpen(3)
        setVideopen(true)
        setStates(Countries.find((ctr) => ctr.name === "SCOPE-3").states);
        setBirim(states.find((state) => state).birim);
      }
      setBaslikvalue('TESİSİNİZDE KULLANILAN SOĞUTUCU YANGIN TÜPLERİ(KARBON ESASLI)')
      // console.log("bassss3", baslik)
     
      // setBirim([...alldata, { "birim": event.target.value }])
      // setBirim(states.find((state) => state).birim);
    }

  };

  const changeState = (event, index) => {

    setDublicate(false)

    if (event.target.id === "SCOPE-3") {
      setSubtitle(event.target.textContent[0])
      states.map((first) => {
        if (first.id === index && event.target.id === "SCOPE-3") {
          setScope3(first.name)
          setId(first.id)
          // console.log("scopeson3", scope3)
          // console.log("scopetext3", event.target.textContent)
        }

      })

      if (event.target.textContent[0] === "U") {
        setSavedDataScope3({ 
          tarih:datetime,
          title: '', 
          subtitle: '', 
          kaynak: '', 
          yakitturu:'',
          birim: '', 
          miktar: '',
          ulke:facilitySend?.country,
          sehir:facilitySend?.city,
          ilce:facilitySend?.state,
          tesis:facilitySend?.facilityname,
          situation:'',
         })
        console.log("Scope-3---------",savedDataScope3)

        setVer(false)
        setGg(true)
        setDegis(true)
        setBaslikvalue('TESİSE AİT ARAÇ EMİLSYONLARI')
        setSavedDataScope3({...savedDataScope3,subtitle:event.target.textContent})

        setCities(states.find((state) => state.name === event.target.textContent).cities);
        setUnits(states.find((state) => state.name === event.target.textContent).units);
        setBirim(states.find((state) => state.name === event.target.textContent).birim);
        setSub({ name1: 'Araç Türü', name2: 'Yakıt Türü', name3: 'Birim', name4: 'Miktar' })

      }
      else if (event.target.textContent[0] === "D") {
        setBaslikvalue('SERVIS PAZARLAMA VE MUSTERI ZIYARETI KAPSAMINDAKI EMILSONLAR')

        setDegis(false)
        setVer(true)
        setGg(false)
        setSub({ name1: 'Ulaşım Türü', name2: 'Yakıt Türü', name3: 'Birim', name4: 'Miktar' })
      }
    }
    else if (event.target.id === "SCOPE-2") {
      states.map((first) => {
        if (first.id === index && event.target.id === "SCOPE-2") {
          setScope2(first.name)
          setBaslik2(event.target.id)
          setDatasub(first.name)
          setId(first.id)
          setSavedData({...savedData,subtitle:event.target.textContent})
        console.log("SCOPE-2-saved-data-subtitle",savedData)
          // console.log("scopeson2", scope2)
          // console.log("scopetxt2", event.target.textContent)
        }

      })

      setCities(states.find((state) => state.name === event.target.textContent).cities);
      setUnits(states.find((state) => state.name === event.target.textContent).units);
      setBirim(states.find((state) => state.name === event.target.textContent).birim);
      setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

    }
    else if (event.target.id === "SCOPE-1") {

      if (event.target.textContent[0] === "S" || "H" || "D") {

        setStates(Countries.find((ctr) => ctr.name === "SCOPE-1").states);
        setShort(states.find((ctr) => ctr.name === event.target.textContent).short);
        setSavedData({...savedData,subtitle:event.target.textContent})
        console.log("saved-data-subtitle",savedData)
        states.map((first) => {
          if (first.id === index && event.target.id === "SCOPE-1") {
            setScope1(first.name)
            setDatasub(first.name)
            setBaslik1(event.target.id)
            setId(first.id)

          }

        })
        // console.log("datasub", datasub)
        // setSubtit(states.find((ctr) => console.log(ctr.short)).subtit);

        handleSubTitle(event.target.textContent)

        // console.log("cities",cities)
        // let exists = Object.values(kapsamdetail).includes("kapsamalt");
        // let obj = kapsamdetail.find(o => o.kapsamalt === 'SABIT YANMA');
        // if (!obj) {
        //   setKapsamdetail([...kapsamdetail, { "kapsamalt": event.target.textContent, state: [] }])

        // }
        // console.log(obj);
        // console.log("CHANGE-STATE", subtitle)
        // console.log("CHANGE-subtitle", subtitle)

        // console.log("subtitle", subtitle)
        // setShort(states.find((ctr) => {
        //   if (subtitle === ctr.name) {
        //     console.log("CHANGE-STATE", ctr.short)
        //     setCar({...car,'hhh':ctr.short})

        //   }
        // }));

        // console.log("shortttt",short)
        // handleSubTitle(event.target.textContent)
        // console.log("subtitle",todos)

        // let obj = kapsamdetail.find(o => o?.kapsamalt === 'SABIT YANMA');
        // console.log("obgggggg",obj.kapsamalt)



        // if (obj.kapsamalt==='SABIT YANMA') {
        //   null
        // }
        // setKapsamdetail([...kapsamdetail,{"kapsamalt":event.target.textContent}])




        // console.log(obj);

        // console.log('isKeyPresent', isKeyPresent);



        setCities(states.find((state) => state.name === event.target.textContent).cities);
        setUnits(states.find((state) => state.name === event.target.textContent).units);
        setBirim(states.find((state) => state.name === event.target.textContent).birim);
        setDegis(false)
        setGg(false)
        setVer(false)
      }


    }

    else {
      setCities(states.find((state) => state.name === event.target.textContent).cities);
      setUnits(states.find((state) => state.name === event.target.textContent).units);
      setBirim(states.find((state) => state.name === event.target.textContent).birim);




      setAlldata([...alldata, { "subtitle": event.target.textContent }])
    }
  }

  const handleAdd = (e) => {
    // ===============================================================================
    const title = todos.find(obj => obj.title === 'SCOPE-1');
    const subtitle = todos.find(obj => obj.subtitle[0] === 'S' || 'H' || 'D');
    const inputveri = cities.length

    

    if (country === 'SCOPE-1') {

      if (inputveri === 24) {

        handleSabit(car)
       
      }
      else if (inputveri === 9) {
        handleHareketli(car)
      }
    }
    // console.log("SCOPE-1", todos)

    //  if (country==='SCOPE-2') {
    //   if (inputveri === 9) {
    //     handleHareketli(car)

    //   }
    //   console.log("SCOPE-2",todos)
    //  }

    // if (country==='SCOPE-3') {
    //   if (inputveri === 6) {
    //     handleDogrudan(car)
    //   }
    // }
    // else{return false}
    // console.log("RESULT",todos)
    // ================================================
    // const handleChange = (e) => {
    //   setSakla3({
    //     ...sakla3,
    //     [e.target.name]: e.target.value,
    //   });


    // if (country==="SCOPE-3" && subtitle==='U') {
    //     setAracdata([...aracdata,{car}])
    // }
    // console.log("arac",todos)


  };

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

  // const handleSave = () => {
  //   setCar({
  //     ...car,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  const handleUpstream = () => {

  }

 
  const changeData = (event, index) => {
    if(event.target.textContent==='Lütfen kayıt için dönem/ay seçinDönem olarak kayıtAy olarak kayıt'){
      setChange(Number(event.target.value))
    }
    
    console.log("baslik1-----",baslik1)
    console.log("baslik2-----",baslik2)
    console.log("baslik3-----",baslik3)

    if(baslik1 || baslik2){
      setSavedData({ 
        tarih:datetime,
        title: '', 
        subtitle: '', 
        kaynak: '', 
        birim: '', 
        miktar: '',
        ulke:facilitySend?.country,
        sehir:facilitySend?.city,
        ilce:facilitySend?.state,
        tesis:facilitySend?.facilityname,
        situation:''
       })
      setSavedData({
        ...savedData,
        [event.target.name]: event.target.value,
      });  
      console.log("Scope-1-2---------",savedData)
 
    }
    else if(baslik3==='SCOPE-3'){
      console.log("baslik3-------------",baslik3)
      setSavedData({ 
        tarih:datetime,
        title: '', 
        subtitle: '', 
        kaynak: '', 
        birim: '', 
        miktar: '',
        ulke:facilitySend?.country,
        sehir:facilitySend?.city,
        ilce:facilitySend?.state,
        tesis:facilitySend?.facilityname,
        situation:''
       })
      setSavedDataScope3({
        ...savedDataScope3,
        [event.target.name]: event.target.value,
      });
      console.log("Scope-1122---------",savedData)
      console.log("Scope-3------------",savedDataScope3)
      // console.log("country",facilitySend?.country)
    }
   
   
   
    // console.log("change-Number-data",change)

   const {name,value} = event.target;
   setFormValues({...formValues,[name]:value})
   setAddList({...addList,[name]:value})

    
    setAlldata([...alldata, { "cities": event.target.value }])
    setAlldata([...alldata, { units: event.target.value }])

    // setSubtitle(event.target.textContent)
    // console.log("subtitle", subtitle)
    // setShort(states.find((ctr) => {
    //   if (subtitle === ctr.name) {
    //    setShort(ctr.short)
    //   }
    // }));   
    // console.log("sub",todos)


    // setCar({
    //   ...car,
    //   [event.target.name]: event.target.value,

    // });
  
 
  


    if (event.target.value === "Yangın Söndürme Tüpü") {
      setDegis(false)
      setGg(false)
      setVer(false)
      // setCities(states.find((state) => state.name === event.target.textContent).cities);
      // setUnits(states.find((state) => state.name === event.target.textContent).units);
      // setBirim(states.find((state) => state.name === event.target.textContent).birim);
    }
    // else if (event.target.value === "Minibüs" || "Otobüs" || "Pazarlama" || "Nakliye") {
    //   setAlldata([...alldata, { amount: event.target.value }])
    // }

    else if (datasub === "DOGRUDAN SIZMA KACAK EMISYONU" && event.target.value !== "Yangın Söndürme Tüpü") {
      setDegis(true)
      setSub({ name1: 'Cihaz Adı', name2: 'Birim', name3: 'Gaz Cinsi', name4: 'Miktar' })
      // setGg(true)
      // setVer(true)
    }
    else { null }
  }
  // console.log("Deneme 1 2",formValues)
  // console.log("taking-data",savedData.situation)
  // console.log("forms---------",savedData)

  const saveValue = (event: String | any, label: String | any) => {
    setVeri(Data?.find((ctr) => ctr.label === event.target.textContent).subtitle)
    setStateScope3(label)
    setSavedDataScope4({...savedDataScope4,type:event.target.textContent})
    // console.log("labelll",savedDataScope4)
    setHoldLabelScope(label)


   
}




const handleValidation = async (event)=>{
  event.preventDefault();

 
  const {name,value} = event.target;
  setFormValues({...formValues,[name]:value})
  // setListData({...formValues,[name]:value})

    setFormErrors(validate(formValues));
    setIsSubmit(true)
    setListData([...listData,{kaynak:formValues.kaynak,birim:formValues.birim,situation:formValues.situation,miktar:formValues.miktar}])
    console.log(formErrors)
    // console.log("data-List",listData)
    // console.log("handle-button---------",savedData)
    console.log("baslik1-----",baslik1)
    console.log("baslik2-----",baslik2)
    console.log("baslik3-----",baslik3)
   
  
  
  }
  useEffect(()=>{
    // console.log("useEffect-ust",formErrors)
    function getDuplicates(arr) {
      const seen = new Set();
      const duplicates = [];
  
      arr.forEach(item => {
          const identifier = `${item.name}|${item.email}`;
          if (seen.has(identifier)) {
              duplicates.push(item);
              setDublicate(true)
          } else {
              seen.add(identifier);
          }
      });
      return duplicates;
  }
  const duplicateUsers = getDuplicates(listData);

    if(Object.keys(formErrors).length === 0 && isSubmit){
      const isEmpty = (obj) => { 
        return Object.keys(obj).length === 0; 
      }; 
      
      
      console.log(formErrors); // true 
      if(isEmpty(formErrorsflist)){

    const config = {
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer: "+token
        }
      };

         if(!dublicate){
          const fetchData = async () => {
           if(baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2'){
            
            const dataResult = await post('/adddata',savedData,config);
            handleSuccess('SCOPE 1 2 Veri başarıyla kayt edildi.')
            console.log("result-data",dataResult)
           }
           else if(baslik3 === "SCOPE-3"){  
            const dataResult = await post('/adddata',savedDataScope3,config);
            handleSuccess('Scope3 başarıyla kayt edildi.')
            console.log("saved3-------",savedDataScope3)
            console.log("result-data",dataResult)
           }
          }
          fetchData()

         }
      }
    }
  },[formErrors]);

  const validate = (values)=>{
    const errors={}
    if(!values.kaynak){
      errors.kaynak = "Bu alan boş bırakılamaz.";
    }
    if(!values.birim){
      errors.birim = "Bu alan boş bırakılamaz.";
    }
    if(!values.miktar){
      errors.miktar = "Bu alan boş bırakılamaz.";
    }
    if(!values.situation){
      errors.situation = "Bu alan boş bırakılamaz.";
    }

    return errors;
  }

  const users = [
    { id: 2, name: 'Sumit Kumar', email: 'sumit@example.com' },
    { id: 4, name: 'Raj Kumar', email: 'raj@example.com' },
    { id: 5, name: 'Amit Kumar', email: 'amit@example.com' },
    { id: 2, name: 'Sumit Kumar', email: 'sumit@example.com' },

];



// console.log("DUPLICATED---------------------",duplicateUsers);
  
  // Facility Sayfasndan gelen veri
  // console.log("coming-data",facilitySend)
 
  // console.log("taking-data-latest",savedData)

  return (
    <div>
      <Breadcrumb pageName="Hesaplama" />
      <Facility  />
      {/* <Language/> */}
      <div className='border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white'>
        <div className='grid grid-cols-3 gap-4'>
          <div className=" border border-slate-300 ">
            <div className="px-4">
              <div className="flex flex-col my-4">
                <span className="title-dynamily">KAPSAM BAŞLIKLARI</span>
                {/* <span>SCOPE & SUBCATEGORY SELECTION</span> */}
              </div>
              <hr />
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <div className="flex">
                  {open === 1 ? <div style={{ background: 'blue', width: '3%', borderRadius: '0px 10px 10px 0px' }}></div> : null}
                  <AccordionHeader onClick={changeCountry} value='SCOPE-1' style={open === 1 ? { paddingLeft: '20px' } : null}>KAPSAM 1</AccordionHeader>
                </div>

                <AccordionBody className='px-3' value={state}>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      {states.map((state, index) => (
                        <button onClick={(event) => changeState(event, index + 1)} id='SCOPE-1' name='cities' key={index} className="my-3 bg-sky-300 p-2 rounded-md"
                          style={scope1 === scope1 && id === index + 1 && baslik1 === 'SCOPE-1' ? { background: '#5bfd4575', display: "block", width: "100%", color: 'black', fontSize: 'large', fontWeight: '500' } : { display: "block", width: "100%" }}>{state.name}
                        </button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>

                <div className="flex">
                  {open === 2 ? <div style={{ background: 'green', width: '3%', borderRadius: '0px 10px 10px 0px' }}></div> : null}
                  <AccordionHeader onClick={changeCountry} value='SCOPE-2' style={open === 2 ? { paddingLeft: '20px' } : null}>
                    KAPSAM 2
                  </AccordionHeader>
                </div>
                <AccordionBody>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      {/* <option>Select souttrce</option> */}
                      {states.map((state, index) => (
                        <button onClick={(event) => changeState(event, index + 1)} id='SCOPE-2' key={index} className="my-3 bg-sky-300 p-2 rounded-md"
                          style={scope2 === scope2 && baslik2 === 'SCOPE-2' ? { background: '#5bfd4575', display: "block", width: "100%", color: 'black', fontSize: 'large', fontWeight: '500' } : { display: "block", width: "100%" }} >{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <div className="flex">
                  {open === 3 ? <div style={{ background: 'purple', width: '3%', borderRadius: '0px 10px 10px 0px' }}></div> : null}
                  <AccordionHeader onClick={changeCountry} value='SCOPE-3' style={open === 3 ? { paddingLeft: '20px' } : null}>
                    KAPSAM 3
                  </AccordionHeader>
                </div>

                <AccordionBody>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      {/* <option>Select souttrce</option> */}
                      {states.map((state, index) => (
                        <button onClick={(event) => changeState(event, index + 1)} id='SCOPE-3' key={index} className="my-3 bg-sky-300 p-2 rounded-md"
                          style={id === index + 1 && baslik === "SCOPE-3" ? { background: '#5bfd4575', display: "block", width: "100%", color: 'black', fontSize: 'large', fontWeight: '500' } : { display: "block", width: "100%" }}
                        >{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>
            </div>
          </div>

          {/* beefore area start*/}
          <div className="col-span-2 backdrop" style={videopen ? { display: 'none' } : { display: 'block' }}>
            <video width="auto" height="500" autoPlay={true} loop muted>
              <source src={Videokayit} type="video/mp4" />
            </video>
            <div className="footprint flex"><span className="video-title">LÜTFEN KAYIT İÇİN TESİSLERDEN BİRİNİ SEÇİN VEYA YENİ BİR TESİS EKLEYİN</span>
            </div>
          </div>
          {/* before area finish */}
          {
            videopen ? <div className="col-span-2 border-slate-300 border">
              <div className='p-3'>
                <div className='flex flex-col'>
                  <span className="title-dynamily">{baslikvalue ? baslikvalue : ""} </span>
                  {/* <span>EMISSIN SOURCE SELECTION:<span>SCOPE 1/STATIONARY COMBUSTION</span></span> */}
                </div>
                <hr className='my-4 ' />
                
                {
                  ver ? <div>
                     <Tabs value='personal'>
                        <TabsHeader className="table-backshadow ">

                      {
                        Data.map(({label,value})=>(
                          <Tab className="text-normal  uppercase font-bold dark:bg-gray-200 dark:text-gray-200 hover:bg-[#6a6a6a1c] duration-300  ease-in-out" 
                          key={value} 
                          value={value} 
                          onClick={(event) => saveValue(event, value)}
                          >
                            {label}
                          </Tab>
                        ))}
                        </TabsHeader>
                        {/* <DataPicker/> */}
                        <div style={{display:statescope3 === 'personal' ? 'block' : 'none'}}><PersonalCar savedData={savedData} savedDataScope4={savedDataScope4} setSavedDataScope4={setSavedDataScope4}/></div>
                        <div style={{display:statescope3 === 'service' ? 'block' : 'none'}}><ServiceCar   savedDataScope4={savedDataScope4} setSavedDataScope4={setSavedDataScope4}/></div>
                        <div style={{display:statescope3 === 'employee' ? 'block' : 'none'}}><EmployeeCar savedDataScope4={savedDataScope4} setSavedDataScope4={setSavedDataScope4}/></div>
                        <div style={{display:statescope3 === 'business' ? 'block' : 'none'}}><TravelCar travelCarControl={travelCarControl}/></div>


                  </Tabs> 
                  
                  </div>
                  :
                    <div className="start">
      <div className="grid grid-cols-1 w-200 " >
      <div className="flex flex-col my-4">
        {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
        <div>
        { change===false ? <i class="fa-solid fa-triangle-exclamation text-2xl" style={{color:"#d46c6c"}}></i> : null}
        <label className="mb-3 ms-3 text-xl">Lütfen kayıt için dönem <span className="font-bold">veya</span> ay seçin</label>
        </div>
        <div className="mt-7">
          <select  value={savedData.situation} name='situation' className={formErrors.situation ? styles.select.error : styles.select.normal} onChange={(event)=>changeData(event)}>
            <option value='0'>Lütfen kayıt için dönem/ay seçin</option>
            <option value='4'>Dönem olarak kayıt</option>
            <option value='5'>Ay olarak kayıt</option>
          </select>
          <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.situation}</small> 
        </div>
       

        {
          change === 4 ? <div className="donem mt-7 ">
          <select className={styles.select.normal} name='situation' value={savedData.situation}  onChange={(event) => changeData(event)}>
            <option>Lütfen kayıt için dönem girin</option>
            <option value='Ocak - Mart'>Ocak - Mart</option>
            <option value='Nisan - Haziran'>Nisan - Haziran</option>
            <option value='Temmuz - Eylül'>Temmuz - Eylül</option>
            <option value='Ekim - Aralık'>Ekim - Aralık</option>
          </select>
        </div> : null
        }
      </div>
    {
      change === 5 ?   <div className="ay">
      <select className={styles.select.normal}  name='situation' value={savedData.situation}  onChange={(event) => changeData(event)}>
        <option>Lütfen kayıt için ay girin</option>
        <option value='Ocak'>Ocak</option>
        <option value='Şubat'>Şubat</option>
        <option value='Mart'>Mart</option>
        <option value='Nisan'>Nisan</option>
        <option value='Mayıs'>Mayıs</option>
        <option value='Haziran'>Haziran</option>
        <option value='Temmuz'>Temmuz</option>
        <option value='Ağustos'>Ağustos</option>
        <option value='Eylül'>Eylül</option>
        <option value='Ekim'>Ekim</option>
        <option value='Kasım'>Kasım</option>
        <option value='Aralık'>Aralık</option>
      </select>
    </div> : null
    }



 {/* <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker> */}
    </div>

                      {/* form start */}
                      <form onSubmit={(event)=>handleValidation(event)}>
                        <div className='grid grid-cols-4 gap-3 my-5'>
                          <div className="block w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>{sub.name1 === '' ? 'Kaynak' : sub.name1}</label>
                            <select value={baslik1 || baslik2 ? savedData.kaynak :  savedDataScope3.kaynak} name={baslik1 || baslik2 ? "kaynak" :"kaynak"} id="cities" className={formErrors.kaynak ? styles.select.error : styles.select.normal}
                              onClick={()=>setTextControl(false)}
                              onChange={(event) => changeData(event)}>
                              {/* onChange={(event) => setAlldata([...alldata, { "cities": event.target.value }])}> */}
                              <option>kaynak girin</option>

                              {cities?.map((citiy, index) => (
                                <option key={index}>{textControl ? 'Kaynak girin' : citiy}</option>
                              ))}
                            </select>
                             <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.kaynak}</small> 

                          </div>

                          <div className="block w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name2 === '' ? 'Birim' : sub.name2}</label>
                            <select value={baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2' ? savedData.birim : savedDataScope3.yakitturu} name={baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2' ? 'birim' : 'yakitturu'} id="units" className={formErrors.birim ? styles.select.error : styles.select.normal}
                              onClick={()=>setTextControl(false)}
                              onChange={(event) => changeData(event)}>
                              <option>{baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2'  ? 'Birim girin' : 'Yakit turu girin'}</option>
                              {units?.map((citiy, index) => (
                                <option key={index}>{textControl ? 'Birim girin' : citiy}</option>
                              ))}
                            </select>
                            <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.birim}</small> 

                          </div>
                          {
                            degis === true ? <div className="block w-full">
                              <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name3 === '' ? 'bos' : sub.name3}</label>
                              <select value={baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2' ? null : savedDataScope3.birim} name={baslik1 === 'SCOPE-1' || baslik2 === 'SCOPE-2' ? '' : 'birim'} id="cities" className={error ? styles.select.error : styles.select.normal}
                                onChange={(event) => changeData(event)}>
                                <option>{baslik3 === 'SCOPE-3' ? 'Birim girin' : 'yakit turu girin'}</option>

                                {birim?.map((citiy, index) => (
                                  <option key={index}>{citiy}</option>
                                ))}
                              </select>
                              {error ? <p class="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">Bu alan boş bırakılmaz.</p> : null}


                            </div> : null
                          }
                          <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sub.name4 === '' ? 'Miktar' : sub.name4}</label>
                            <input
                              type="text"
                              value={baslik1 || baslik2 ? savedData.miktar : savedDataScope3.miktar}
                              name='miktar'
                              className={formErrors.miktar ? styles.input.error : styles.input.normal}
                              placeholder="miktar girin"
                              onChange={(event) => changeData(event)}
                            />
                             <small class="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.miktar}</small> 


                          </div>
                        </div>
                        <div className='flex justify-end mt-4'>
                  <button type="submit" className="relative inline-flex items-center justify-center p-2 w-30 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    {
                      load ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg> : null
                    }
                    {load ? 'Kaydediliyor' : "Kaydet"}
                  </button>

                 
                  {/* <button
                onClick={(e) => handleAdd(e)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{degis ? "Ekle" : "Kaydet"}
                </button> */}
                  {/* {
                gg ? <button
                  onClick={(e) => handleSubmit(e)}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{degis ? "Kaydet" : "Kaydet"}</button>
                  : null
              } */}
                </div>
                      </form>
                    </div>
                }
               
                {/* form end */}
                <hr className='mt-3' />
               { dublicate ?  <div className={dublicate ? 'errorListData' : 'warningListData'} style={{background:'#ff000026',width:'100%',height:'40px'}}>
                <i class="fa-solid fa-triangle-exclamation text-2xl p-1 ms-4" style={{color:"#d46c6c"}}></i> 
                <label className="mb-3 ms-3 text-normal">Bu veri daha önce kayıt edildi</label>
                </div> : null
                
               }
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4" style={(travelCarControl === false && holdLabelScope === 'business')  ? {display:'none'} : {display:'block'}}>

                  
                    

                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
                          Kaydedilen Liste
                          {/* <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p> */}
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>  
                            <th scope="col" className="px-6 py-3">
                              Kaynak
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Birim
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Miktar
                            </th>
                            <th scope="col" className="px-6 py-3 text-center w-0">
                              Düzenle
                            </th>
                            <th scope="col" className="px-6 py-3 text-center w-0">
                              Sil
                            </th>
                          
                          </tr>
                        </thead>

                        {
                          listData?.map((arac, index) => (

                            <tbody key={index}>
                              <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {arac.kaynak}
                                </th>
                                <td className="px-6 py-4">
                                {arac.birim}
                                </td>
                                <td className="px-6 py-4">
                                {arac.miktar}
                                </td>
                                <td className="px-6 py-4 text-center">
                                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Duzenle
                                    </span>
                                </button>
                                </td>
                                <td class="px-6 py-4 text-center">
                                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Sil
                                    </span>
                                </button>
                                </td>
                              </tr>
                            </tbody>
                          ))
                        }
                      </table> 
                
                </div>
                       {listData.length >=5 ?  <a href="/sumary"><button  className="w-full mt-4 relative inline-flex items-center justify-center p-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">Devamını gör</button>
                        </a> : null}
              </div>
            </div> : null
          }
        </div>
      </div>
  <ToastContainer/>
    </div>
  );
}
export default AccordionCustomIcon




