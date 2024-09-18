import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, } from "@material-tailwind/react";
import Table from "../../common/Table/index"
import { useEffect, useState } from "react";
import{get} from "../../server/Apiendpoint"


const TabsDefault = () => {

   const [veri,setVeri] = useState([])
     const data = [
        {
            label: "KAPSAM-1",
            value: "html",
            subtitle:['SABİT YANMA','HAREKETLİ YANMA','DOĞRUDAN SIZMA KAÇAK EMILSYONU'],
            desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
        },
        {
            label: "KAPSAM-2",
            value: "react",
            subtitle:['SATIN ALINAN ENERJI'],
            desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "KAPSAM-3",
            value: "vue",
            subtitle:['UPSTREAM','DOWNSTREAM'],
            desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "SCOPE-4",
            value: "angular",
            desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
        },

    ];

//    setVeri(data.find((ctr)=>ctr.name===event.target.textContent).veri)
    
    type Props = {
        data:Array<String>
        label:String
    }
    const [state,setState] = useState('SCOPE-1')

    const saveValue=(label:String|any)=>{
    //  setState(event.target.value)
        setState(label)


    }
    // console.log("state",state)

// console.log("STATE",state)


    const [users,setUsers] =useState([])
  
    const atis = async()=>{
  
      
    
          const loginuser = await get("/getdata")
        //   console.log("getget",setUsers(loginuser.data))
     }
  
  atis()


    return (
        <Tabs value="html">
            <TabsHeader className="table-backshadow">
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={()=>saveValue(label)}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>

            {/* <TabsHeader className="table-backshadow">
                {veri.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={()=>saveValue(label)}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader> */}
            <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        <Table state={state}/>
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
export default TabsDefault