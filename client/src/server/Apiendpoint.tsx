import axios from "axios"

const instance = axios.create({
    baseURL:'https://dashboard-admin-new.vercel.app'
})


export const post = (url,data)=>instance.post(url,data)
export const get  = (url)=>instance.get(url)

