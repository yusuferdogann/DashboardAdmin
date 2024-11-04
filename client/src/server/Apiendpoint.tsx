import axios from "axios"

const instance = axios.create({
    // baseURL:'https://dashboard-admin-lovat.vercel.app'

    // =====son guncel api======
    baseURL:'https://dashboard-admin-43ed.vercel.app' 
    

    // =====local api===========
    // baseURL:'http://localhost:3000/api'


})


export const post = (url,data)=>instance.post(url,data)
export const get  = (url)=>instance.get(url)


// dashboard-admin-new.vercel.app