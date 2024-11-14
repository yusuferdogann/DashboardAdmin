import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, } from "@material-tailwind/react";
import Table from "../../common/Table/index"
import { useEffect, useState } from "react";
import { post } from "../../server/Apiendpoint"
import {userAuth} from "../../auth/userAuth"


const TabsDefault = () => {
    const [open, setOpen] = useState();
    const handleOpen = (index) => setOpen(open === index ? index : index);
    // console.log("opennnn", open)
    const {token} = userAuth()
    const [veri, setVeri] = useState(["SABIT YANMA", "HAREKETLI YANMA", "DOĞRUDAN SIZMA KAÇAK EMILSYONU"])
    const [veri2, setVeri2] = useState([])
    const [requestData,setRequestData] = useState([{}])
    const [sendingData,setSendingData] = useState({ScopeTitle:'',Situation:'',Subtitle:''})
    const Data = [
        {
            label: "KAPSAM-1",
            value: "html",
            scopename:'SCOPE-1',
            subtitle: ['SABİT YANMA', 'HAREKETLİ YANMA', 'DOĞRUDAN SIZMA KAÇAK EMILSYONU'],

        },
        {
            label: "KAPSAM-2",
            value: "react",
            scopename:'SCOPE-2',
            subtitle: ['SATIN ALINAN ENERJI'],
        },
        {
            label: "KAPSAM-3",
            value: "vue",
            scopename:'SCOPE-3',
            subtitle: ['Upstream Nakliye (aracın firmaya ait olması durumunda)', 'Downstream Nakliye hizmetin dışardan satın alınması durumunda)'],

            deeptitle: [
                ['Servis Araçlar'],
                ['Şahsi Araçlar', 'Servis Araçlar', 'Müşteri Ziyaretlerİnde Kullanılan Araçlar']
            ],
            subtitleD: ['Downstream Nakliye hizmetin dışardan satın alınması durumunda)'],
            deeptitleU: ['Servis Araçlar'],
            deeptitleD: ['Şahsi Araçlar', 'Servis Araçlar', 'Müşteri Ziyaretlerİnde Kullanılan Araçlar'],
        },
        // {
        //     label: "KAPSAM-4",
        //     value: "angular",
        //     desc: `Because it's about motivating the doers. Because I'm here
        // to follow my dreams and inspire other people to follow their dreams, too.`,
        // },
        // subtitle: [
        //     {
        //         name:'Upstream Nakliye (aracın firmaya ait olması durumunda)',
        //         servicetype:["Servis Araclar"]
        //     },
        //     { 
        //         name:'Downstream Nakliye hizmetin dışardan satın alınması durumunda)',
        //         servicetype:['Şahsi Araçlar','Servis Araçlar','Müşteri Ziyaretlerİnde Kullanılan Araçlar'],
        //     }
        // ],

    ];

    //    setVeri(data.find((ctr)=>ctr.name===event.target.textContent).veri)

    type Props = {
        data: Array<String>
        label: String
    }
    const [state, setState] = useState('SCOPE-1')

    const saveValue = (event: String | any, label: String | any,scopename: String | any) => {
        handleOpen(false)
        setVeri(Data?.find((ctr) => ctr.label === event.target.textContent).subtitle)
        setState(label)
        console.log("scopename",scopename)
        // setSendingData({ScopeTitle:label})
        setRequestData({...requestData,'ScopeTitle':scopename})

        if (state === "KAPSAM-1" || "KAPSAM-2") {
            setVeri2(null)
        }
        // setRequestData({'ScopeTitle':state})
        console.log("ver---------",requestData)

    }
    // console.log("veri  ", state)
    console.log("getir-----",requestData)

    // setRequestData([{...requestData,'ScopeTitle':state}])
    // setRequestData({'ScopeTitle':state})


  
    const [change,setChange] = useState(false)
    const [checksubtitle,setCheckSubtitle] = useState(false)
    const [getData,setGetData] = useState({donem:'',ay:''})
    const [returnData,setReturnData] = useState([])



    const changeControl = (event)=>{
        // console.log(event.target.value,"valuuuuu")
        const {name,value} = event.target;
        setChange(Number(event.target.value))
        // console.log("getVALUE",getData)


      }


      const getSubtitle = (event)=>{
        setCheckSubtitle(true)
        console.log("eventtt------",state)
        // setRequestData([{'Situation':event.target.value}])
        console.log("Update-Situation=================",requestData)
        setRequestData({"ScopeTitle":state,'Situation':event.target.value})
        // setRequestData({"ScopeTitle":state,"ScopeTitle":state,'Situation':event.target.value})


        // console.log("Situation--------------------",event.target.value)
        // console.log("ScopeTitle--------------------",state)
        console.log("Request-Data=================",requestData)
      }
    //   console.log("Request-Data=================",requestData)

      const checkControlCarType = async(e, index) => {
        // console.log("indexxxx", index)
        // console.log("true---------------", )
        // console.log('sub-title-------------------',e.target.textContent)
        setRequestData({...requestData,'Subtitle':e.target.textContent})
        // console.log('sub-title-------------------',requestData)
        // console.log(index)
        
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:"Bearer: "+token
                }
                    };
                const addfacilitydata = await post('/getsummarydata',requestData,config)
                console.log("RESULT----------------------------",addfacilitydata.data.data)
                setReturnData(addfacilitydata.data.data)
        

        handleOpen(index)
        if (index === 0 && state === 'KAPSAM-3') {
            setVeri2(['Şahsi Araçlar'])
            // console.log(index)
        }
        else if (index === 1 && state === "KAPSAM-3") {
            console.log("yessss D", index)
            setVeri2(['Şahsi Araçlar', 'Servis Araçlar', 'Müşteri Ziyaretlerİnde Kullanılan Araçlar'])
        }
        else if (state === "KAPSAM-1") {
            setVeri2([null])
        }
    }
    // console.log("requestData-------",requestData)
    // console.log("state",state)

    // console.log("STATE",state)



    // const atis = async()=>{



    //       const loginuser = await get("/getdata")
    //     //   console.log("getget",setUsers(loginuser.data))
    //  }

    //   atis()




    return (
        <>
         <div className="flex justify-between gap-2 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  mb-2">
        
            <div className="grid grid-cols-1 w-200 "  >
                <div className="flex flex-col mb-4">
                            {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
                            <div className="">
                                {change === false ? <i className="fa-solid fa-triangle-exclamation text-2xl" style={{ color: "#d46c6c" }}></i> : null}
                                <label className=" ms-3 text-xl">Lütfen özet için dönem <span className="font-bold">veya</span> ay seçin</label>
                            </div>
                            <div className="mt-7">
                                <select className='py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none' 
                                onChange={(event) => changeControl(event)}>
                                    <option>Lütfen rapor için dönem/ay seçin</option>
                                    <option value='4'>Dönem olarak rapor</option>
                                    <option value='5'>Ay olarak rapor</option>
                                </select>
                            </div>


                            {
                                change === 4 ? <div className="donem mt-7 ">
                                    <select onChange={getSubtitle} className="py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
                                        <option>Lütfen rapor için dönem girin</option>
                                        <option value='Ocak - Mart'>Ocak - Mart</option>
                                        <option value='Nisan - Haziran'>Nisan - Haziran</option>
                                        <option value='Temmuz - Eylül'>Temmuz - Eylül</option>
                                        <option value='Ekim - Aralık'>Ekim - Aralık</option>
                                    </select>
                                </div> : null
                            }

{
                            change === 5 ? <div className="ay mt-5">
                                <select onChange={getSubtitle} className="py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
                                    <option>Lütfen rapor için ay girin</option>
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
                </div>
            </div>
        {/* <div>
           <h6 className="font-bold mb-5">Kayit Turu</h6>
           <div className="flex"><p value={getData.donem} name='donem'>selam</p><i className="fa-solid fa-triangle-exclamation text-2xl" style={{ color: "#d46c6c" }}></i> </div>
           <div className="flex"><p value={getData.ay} name='ay'>selam</p><i className="fa-solid fa-triangle-exclamation text-2xl" style={{ color: "#d46c6c" }}></i> </div>

        </div> */}
      </div>
            <Tabs value="html" className='p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <TabsHeader className=" mt-5" style={{ fontWeight: '800' }}>
                    {Data.map(({ label,scopename, value }) => (
                        <Tab className="text-normal  uppercase font-bold dark:bg-gray-100 dark:text-gray-100 hover:bg-[#6a6a6a1c] duration-300  ease-in-out"  key={scopename} value={value} onClick={(event) => saveValue(event, label,scopename)}>
                            {label}
                        </Tab>
                    ))}
                   
                </TabsHeader>
                
               {
                checksubtitle === true ? <>
                 <div className="crazy " style={{ display: 'flex' }}>
                    {veri?.map((citiy, index) => (
                        <button onClick={(e) => checkControlCarType(e, index)} style={open === index ? { border: '1px solid #e2e2e2', padding: '10px', margin: '40px 40px', borderRadius: "10px", color: 'white', background: '#c2c2c2' } : { margin: '40px 40px', padding: '10px', borderRadius: "10px" }} className="table-backshadow hover:bg-[#6a6a6a1c] bg-white duration-300  ease-in-out" key={index}>{citiy}</button>
                    ))}
                </div>
                <div className="crazy " style={{ display: 'flex' }}>
                    {veri2?.map((citiy, index) => (
                        <button className="table-backshadow hover:bg-[#6a6a6a1c] bg-white duration-300  ease-in-out" style={{ margin: '0px 40px', padding: '10px', borderRadius: "10px" }}  key={index}>{citiy}</button>
                    ))}
                </div> 
               
                </>  : null
               }
                <TabsBody>
                    {Data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            <Table state={state} returnData={returnData}/>
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
            <div>
            </div>
        </>
    );
}
export default TabsDefault