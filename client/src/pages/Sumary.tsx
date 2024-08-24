import Tabs from "../common/Tabs/index"
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
    <div>
        <Tabs/>
    </div>
  )
}

export default Sumary