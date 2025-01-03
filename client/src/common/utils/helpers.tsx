import {toast} from "react-toastify"

export const handleSuccess = (msg:String)=>{
    toast.success(msg,{
        position: "top-right",
        autoClose: 2000,
    

    })
}
export const handleError = (msg:String)=>{
    toast.error(msg,{
        position:"top-right"
    })
}


export const handleErrorForFacility = (msg:String)=>{
    toast.warning(msg,{
        position: "top-right",
        autoClose: 10000,

    })
}