import axios from "axios"

const instance = axios.create({
    baseURL:'http://localhost:3000/api'
})


export const post = (url,data)=>instance.post(url,data)
export const get  = (url)=>instance.get(url)