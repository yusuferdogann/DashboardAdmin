import axios from "axios"

const instance = axios.create({
    // baseURL:'https://dashboard-admin-lovat.vercel.app'
    baseURL:'http://dashboard-admin-lovat.vercel.app/api'

})


export const post = (url,data)=>instance.post(url,data)
export const get  = (url)=>instance.get(url)


// dashboard-admin-new.vercel.app