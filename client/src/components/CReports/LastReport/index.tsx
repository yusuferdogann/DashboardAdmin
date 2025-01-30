import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, } from "@material-tailwind/react";
import Table from "../../../common/Table/index"
import { useEffect, useState } from "react";
import { post } from "../../../server/Apiendpoint"
import {userAuth} from "../../../auth/userAuth"


const TabsDefault = () => {
    const [open, setOpen] = useState();
    const [subOpen, setSubOpen] = useState();

    const handleOpen = (index) => setOpen(open === index ? index : index);
    const handleSubOpen = (index) => setSubOpen(subOpen === index ? index : index);

    const {token} = userAuth()
    console.log("token",token)
    const [veri, setVeri] = useState(["SABIT YANMA", "HAREKETLI YANMA", "DOĞRUDAN SIZMA KAÇAK EMILSYONU"])
    const [veri2, setVeri2] = useState([])
    const [requestData,setRequestData] = useState([{}])
    const [sendingData,setSendingData] = useState({ScopeTitle:'',Situation:'',Subtitle:''})
    const Data = [
        {
            label: "Rapor Periodu",
            value: "html",
            scopename:'SCOPE-1',
            subtitle: ['SABİT YANMA', 'HAREKETLİ YANMA', 'DOĞRUDAN SIZMA KAÇAK EMILSYONU'],

        },
        {
            label: "Kuruluş Bilgileri",
            value: "react",
            scopename:'SCOPE-2',
            // subtitle: ['SATIN ALINAN ENERJI'],
        },
        {
            label: "Toplu Ürün Kategorileri",
            value: "vue",
            scopename:'SCOPE-3',
        },
        {
            label: "İlgili Ürün Kategorileri",
            value: "react",
            scopename:'SCOPE-2',
        },
        {
            label: "Satın Alınan Ürünler",
            value: "react",
            scopename:'SCOPE-2',
        },
        {
            label: "Kaynak Akışları Ve Emisyon Kaynakları",
            value: "react",
            scopename:'SCOPE-2',
        },
        

    ];


    type Props = {
        data: Array<String>
        label: String
    }
    const [state, setState] = useState('SCOPE-1')

    const saveValue = (event: String | any, label: String | any,scopename: String | any) => {
        handleOpen(false)
        setVeri(Data?.find((ctr) => ctr.label === event.target.textContent).subtitle)
        setState(label)
        setVeri2(null)
        
        setRequestData({...requestData,'ScopeTitle':scopename})
        setRequestData(prevState => {
            const {TravelType, ...newItems} = prevState;    
            return newItems;
        });
        console.log("new kapsam 2--------------",requestData)
   

    }
     
    const [change,setChange] = useState(false)
    const [checksubtitle,setCheckSubtitle] = useState(false)
    const [getData,setGetData] = useState({donem:'',ay:''})
    const [returnData,setReturnData] = useState([])

    const changeControl = (event)=>{
        const {name,value} = event.target;
        setChange(Number(event.target.value))
      }
      const getSubtitle = (event)=>{
        setCheckSubtitle(true)
        console.log("eventtt------",state)

        console.log("Update-Situation=================",requestData)
        setRequestData({"ScopeTitle":state,'Situation':event.target.value})
      
      }

      const checkControlCarType = async(e, index) => {

        setRequestData({...requestData,'Subtitle':e.target.textContent})
        if (index === 0 && state === 'KAPSAM-3') {
            setVeri2(['Şahsi Araçlar'])
            handleSubOpen(22)
        }
        else if (index === 1 && state === "KAPSAM-3") {
            handleSubOpen(22)
            setVeri2(['Şahsi Araçlar', 'Servis Araçlar', 'Müşteri Ziyaretlerİnde Kullanılan Araçlar'])
        }
       
        else if (state === "KAPSAM-1") {
            setVeri2([null])
        }
        
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
      
    }

    const checkSubButtonSelect = async (e,index) =>{
        handleSubOpen(index)
        console.log("text---------",e.target.textContent)
        setRequestData({...requestData,'TravelType':e.target.textContent})

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer: "+token
            }
                };
        const addfacilitydata = await post('/getsummarysubdata',requestData,config)
            console.log("SUB-SUB-RESULT----------------------------",addfacilitydata.data.data)
            setReturnData(addfacilitydata.data.data)

      
    }

    return (
        <>
         <div className="flex justify-between gap-2 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  mb-2">
        
           
     
      </div>
            <Tabs value="html" className='p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                <TabsHeader className=" mt-5" style={{ fontWeight: '800',alignItems:'center' }}>
                    {Data.map(({ label,scopename, value }) => (
                        <Tab style={{alignItems:'center'}} className="text-normal  uppercase font-bold dark:bg-gray-100 dark:text-gray-100 hover:bg-[#6a6a6a1c] duration-300  ease-in-out"  key={scopename} value={value} onClick={(event) => saveValue(event, label,scopename)}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
             
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