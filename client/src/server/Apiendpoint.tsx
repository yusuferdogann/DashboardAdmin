import axios from "axios"

const instance = axios.create({
    // baseURL:'https://dashboard-admin-lovat.vercel.app'
    // baseURL:'https://dashboard-admin-lovat.vercel.app/api' son guncel api

    baseURL:'http://localhost:3000/api'


})


export const post = (url,data)=>instance.post(url,data)
export const get  = (url)=>instance.get(url)


// dashboard-admin-new.vercel.app