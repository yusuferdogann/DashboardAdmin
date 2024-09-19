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
          units: ['scope-1', 'ton', 'lt', 'm3']
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
      name: "Scope-2",
      states: [
        {
          id:1,
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
          id:1,
          name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
          cities: ["Minibüs", "Otobüs", "Pazarlama", "Nakliye"],
          units: ['dizel', 'lpg'],
          birim: ['lt', 'ton', 'm3']

        },
        {
          id:2,
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

  const styles = {
    popup: {
        borderRadius: "10px",
        background:"red"
    }
  }
  


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
  const [ver, setVer] = useState(false)
  const [sub, setSub] = useState({ name1: '', name2: '', name3: '', name4: '' })
  const [degis, setDegis] = useState(false)
  const [gg, setGg] = useState(false)
  const [date, setDate] = useState({ startDate: '', endDate: '' })
  const [bigdata, setBigdata] = useState([])
  const [todos, setTodos] = useState([
    { id: 1, title: '', subtitle: '', sabit: ["sab"], hareketli: ['har'], dogrudan: ['dog'] },
    { id: 2, title: '', subtitle: '', elektrik: ['ele'] },
    { id: 3, title: '', subtitle: '', upstream: ['gg'], downstrem: ['rr'] }
  ]);
  // const [todos, setTodos] = useState([{ id: 1, title: "", data: [] }]);
  const [vida,setVida] = useState(false)
  const [baslik, setBaslik] = useState()
  const [subtitle, setSubtitle] = useState([])
  const [short, setShort] = useState([])
  const [car, setCar] = useState({ aracturu: '', yakitturu: '', birim: '', miktar: '' })
  const [aracdata, setAracdata] = useState([])
  const [baslikvalue, setBaslikvalue] = useState('')
  const [load,setLoad] = useState(false)
  // function handleTitle(value,id){
  //   setTodos(...todos,
  //     todos.find((gg)=>gg.id===id)
  //      ? gg.title === value : todos
  //   )
  // }
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
    console.log(todos);
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
    console.log(todos);
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

    console.log(todos);
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

    console.log(todos);
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

    console.log(todos);
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

    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === "Scope-1").states);

    if (event.target.value === 'Scope-1') {
      setBaslik(event.target.value)
      setBaslikvalue('TESİSTE ISINMA VE ÜRETİM AMACIYLA KULLANILAN ENERJİ TÜRLERİ')
      console.log("baslik", baslikvalue)
      setStates(Countries.find((ctr) => ctr.name === "Scope-1").states);
      // setShort(states.find((ctr) => ctr.short===ctr.short).short);


      // handleTitle(event.target.value,1)
      handleTitle(event.target.value)
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

      console.log("todos", todos)
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
    else if (event.target.value === 'Scope-2') {
      handleOpen(2)
      setGg(false)
      setDegis(false)
      setVer(false)
      handleTitle(event.target.value)
      setBaslikvalue('TESIS BUNYESINDE KAYITLI ARACLARIN KULLADIGI YAKITLAR')
      console.log("baslik", baslikvalue)

      setStates(Countries.find((ctr) => ctr.name === "Scope-2").states);


    }
    else if (event.target.value === 'Scope-3') {
      handleOpen(3)
      setBaslikvalue('TESISINIZDE KULLANILAN SOGUTUCU,YANGIN TUPLERI(KARBON ESASLI)')
      console.log("baslik", baslikvalue)
      setStates(Countries.find((ctr) => ctr.name === "Scope-3").states);
      setBirim(states.find((state) => state).birim);
      // setBirim([...alldata, { "birim": event.target.value }])
      // setBirim(states.find((state) => state).birim);
    }

  };


  const changeState = (event, index) => {
      console.log("indxxxxxxx",index)

    
    if (event.target.id === "Scope-3") {
      setSubtitle(event.target.textContent[0])
      console.log("stateeee",states)
      states.map((first)=>{
        if (first.id===index && event.target.id==="Scope-3") {
         setVida(first.id)
         console.log("vidaaaa",vida)
        }
       
      })
      
      if (event.target.textContent[0] === "U") {
        setVer(false)
        setGg(true)
        setDegis(true)
        setBaslikvalue('TESISE AIT ARAC EMILSYONLARI')

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
    else if (event.target.id === "Scope-2") {
      states.map((first)=>{
        if (first.id===index && event.target.id==="Scope-2") {
         setVida(first.id)
         console.log("vidaaaa",vida)
        }
       
      })
      
      setCities(states.find((state) => state.name === event.target.textContent).cities);
      setUnits(states.find((state) => state.name === event.target.textContent).units);
      setBirim(states.find((state) => state.name === event.target.textContent).birim);
      setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

    }
    else if (event.target.id === "Scope-1") {
      if (event.target.textContent[0] === "S" || "H" || "D") {

        setStates(Countries.find((ctr) => ctr.name === "Scope-1").states);
        setShort(states.find((ctr) => ctr.name === event.target.textContent).short);

        states.map((first)=>{
          if (first.id===index && event.target.id==="Scope-1") {
           setVida(first.id)
           console.log("vidaaaa",vida)
          }
         
        })
        
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

      setSub({ name1: 'Kaynak', name2: 'Birim', name3: '', name4: 'Miktar' })

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
    const title = todos.find(obj => obj.title === 'Scope-1');
    const subtitle = todos.find(obj => obj.subtitle[0] === 'S' || 'H' || 'D');
    const inputveri = cities.length

    if (country === 'Scope-1') {

      if (inputveri === 24) {

        handleSabit(car)
      }
      else if (inputveri === 9) {
        handleHareketli(car)
      }
    }
    console.log("Scope-1", todos)

    //  if (country==='Scope-2') {
    //   if (inputveri === 9) {
    //     handleHareketli(car)

    //   }
    //   console.log("scope-2",todos)
    //  }

    // if (country==='Scope-3') {
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


    // if (country==="Scope-3" && subtitle==='U') {
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

  const changeData = (event) => {

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


    setCar({
      ...car,
      [event.target.name]: event.target.value,

    });



    if (event.target.value === "Yangın Söndürme Tüpü") {
      console.log("yangin")
      setDegis(false)
      setGg(false)
      setVer(false)
      setSub({ name1: 'Cihaz Adı', name2: 'Birim', name3: 'Gaz Cinsi', name4: 'Miktar' })
      // setCities(states.find((state) => state.name === event.target.textContent).cities);
      // setUnits(states.find((state) => state.name === event.target.textContent).units);
      // setBirim(states.find((state) => state.name === event.target.textContent).birim);
    }
    // else if (event.target.value === "Minibüs" || "Otobüs" || "Pazarlama" || "Nakliye") {
    //   setAlldata([...alldata, { amount: event.target.value }])


    // }

    else {
      setDegis(true)
      // setGg(true)
      // setVer(true)
    }
  }

  const getData = (value1) => {
    setBigdata([...bigdata, { "StartDate": value1 }])

    // console.log("dateeeee",date)
    // setBigdata(startDate:date.startDate)
    console.log("bigbig", value1)
    console.log("DENEME", bigdata)


  }
  const getUlke = (valuee) => {
    // setBigdata([...bigdata,{valuee}])
    // console.log("bigbigbig",valuee)
  }

  // const handleSave = () => {
  //   setCar({
  //     ...car,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  const handleUpstream = () => {

  }
  const Loading = () => {
    console.log("selam")
   setTimeout(()=>{
      setLoad(true)
      setTimeout(()=>{
        setLoad(false)
  
        
      },500)
      
    },500)
    

  }

  return (



    <div >
      <Facility facilityData={getUlke} />
      <div className='border border-slate-300 rounded-2xl  p-5 '>
        <div className='grid grid-cols-3 gap-4'>
          <div className=" border border-slate-300 rounded-2xl bg-neutral-200">
            <div className="px-4">
              <div className="flex flex-col my-4">
                <span className="font-bold">STEP 1</span>
                {/* <span>SCOPE & SUBCATEGORY SELECTION</span> */}
              </div>
              <hr />
              <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <div className="flex">
              {open===1 ?   <div  style={{background:'blue',width:'3%',borderRadius:'0px 10px 10px 0px'}}></div> : null}
                <AccordionHeader onClick={changeCountry} value='Scope-1' style={open===1?{paddingLeft:'20px'}: null}>KAPSAM 1</AccordionHeader>
                </div>

                <AccordionBody className='px-3' value={state}>
                  {
                    <div
                      className="form-control"
                      value={state}
                      multiple={false}
                    >
                      {states.map((state, index) => (
                        <button  onClick={(event)=>changeState(event,index+1)} id='Scope-1' key={index} className="my-3 bg-sky-300 p-2 rounded-md" 
                        style={ vida===index+1 && event?.target.id==="Scope-1"? {background:'#5bfd45',display: "block", width: "100%",color:'black',fontSize:'large',fontWeight:'500'} : {display: "block", width: "100%"} }>{state.name}
                        </button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>

               <div className="flex">
                  {open===2 ? <div  style={{background:'green',width:'3%',borderRadius:'0px 10px 10px 0px'}}></div> : null}
               <AccordionHeader onClick={changeCountry} value='Scope-2' style={open===2?{paddingLeft:'20px'}: null}>
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
                        <button onClick={(event)=>changeState(event,index+1)} id='Scope-2' key={index} className="my-3 bg-sky-300 p-2 rounded-md" 
                        style={ vida===index+1 && event?.target.id==='Scope-2' ? {background:'#5bfd45',display: "block", width: "100%",color:'black',fontSize:'large',fontWeight:'500'} : {display: "block", width: "100%"}} >{state.name}</button>
                      ))}
                    </div>
                  }
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
               <div className="flex">
                  {open ===3 ? <div  style={{background:'purple',width:'3%',borderRadius:'0px 10px 10px 0px'}}></div> :null}
               <AccordionHeader onClick={changeCountry} value='Scope-3' style={open===3?{paddingLeft:'20px'}: null}>
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
                        <button onClick={(event)=>changeState(event,index+1)} id='Scope-3' key={index} className="my-3 bg-sky-300 p-2 rounded-md" 
                        style={ vida===index+1 && event?.target.id==='Scope-3' ? {background:'#5bfd45',display: "block", width: "100%",color:'black',fontSize:'large',fontWeight:'500'} : {display: "block", width: "100%"}}
                        >{state.name}</button>
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
                <span className="font-bold">{baslikvalue ? baslikvalue : ""} </span>
                {/* <span>EMISSIN SOURCE SELECTION:<span>SCOPE 1/STATIONARY COMBUSTION</span></span> */}
              </div>
              <hr className='my-4' />
              {
                ver ? <Deneme /> :
                  <div className="start">
                    <div className=''>
                      <DataPicker deneme={getData} />
                    </div>

                    {/* form start */}
                    <form >
                      <div className='grid grid-cols-4 gap-3 my-5'>
                        <div className="block w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>{sub.name1 === '' ? 'Kaynak' : sub.name1}</label>
                          <select value={car.aracturu} name='aracturu' id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                            onChange={(event) => changeData(event)}>
                            {/* onChange={(event) => setAlldata([...alldata, { "cities": event.target.value }])}> */}
                            <option>kaynak girin</option>

                            {cities?.map((citiy, index) => (
                              <option key={index}>{citiy}</option>
                            ))}
                          </select>
                        </div>

                        <div className="block w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name2 === '' ? 'Birim' : sub.name2}</label>
                          <select value={car.yakitturu} name='yakitturu' id="units" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                            onChange={(event) => changeData(event)}>
                            <option>birim girin</option>
                            {units?.map((citiy, index) => (
                              <option key={index}>{citiy}</option>
                            ))}
                          </select>
                        </div>
                        {
                          degis === true ? <div className="block w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-600 w-full">{sub.name3 === '' ? 'bos' : sub.name3}</label>
                            <select value={car.birim} name='birim' id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none"
                              onChange={(event) => changeData(event)}>
                              <option>birim girin</option>

                              {birim?.map((citiy, index) => (
                                <option key={index}>{citiy}</option>
                              ))}
                            </select>
                          </div> : null
                        }
                        <div>
                          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sub.name4 === '' ? 'Miktar' : sub.name4}</label>
                          <input
                            type="text"
                            value={car.miktar}
                            name='miktar'
                            className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="miktar girin"
                            required
                            onChange={(event) => changeData(event)}
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
                      {
                        aracdata.map((arac, index) => (

                          <tbody key={index}>
                            <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {arac.car.aracturu}
                              </th>
                              <td class="px-6 py-4">
                                {arac.car.yakitturu}
                              </td>
                              <td class="px-6 py-4">
                                {arac.car.birim}
                              </td>
                              <td class="px-6 py-4">
                                {arac.car.miktar}
                              </td>
                              {/* <td class="px-6 py-4 text-right">
               <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
           </td> */}
                            </tr>
                          </tbody>
                        ))
                      }
                    </table> : null
                }
              </div>

              <div className='flex justify-end mt-4'>
                <button onClick={()=>Loading()}  type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                 {
                  load ?  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg> : null
                 }
                  {load ? 'Kaydediliyor' :"Kaydet"}
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
            </div>
          </div>
        </div>
      </div>
      {/* <Deneme/> */}

    </div>
  );
}
export default AccordionCustomIcon




