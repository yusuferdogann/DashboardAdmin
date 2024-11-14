import Tabs from "../common/Tabs/index"
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import{get} from "../server/Apiendpoint"
import { useEffect, useState } from "react"


const Sumary = () => {

  const [users,setUsers] =useState([])

  const atis = async()=>{

    
  
        const loginuser = await get("/getdata")
        console.log("getuser",loginuser)
   }

atis()

  return (
   <>
    <Breadcrumb pageName="Özet" />

<div>
  
    <Tabs/>
</div>
   </>
  )
}

export default Sumary