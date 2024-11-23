import axios from "axios"

export const instance = axios.create({
    // baseURL:'https://dashboard-admin-lovat.vercel.app'

    // =====son guncel api======
    // baseURL:'https://dashboard-admin-43ed.vercel.app/api' 

    // 23.11.2024----------
        baseURL:'https://dashboard-admin-rho-nine.vercel.app/auth' 

    
    

    // =====local api===========
    // baseURL:'http://localhost:3000/auth',
    
})

// export const configdetail = axios.interceptors.request.use((config) => {
//     const token = JSON.parse(localStorage.getItem("access_token"));
//     console.log("GELIYOR------------------",token)
//     if (token) {
//       config.headers.Authorization = `Bearer: ${token}`;
//       config.headers["Content-Type"] = "application/json";
//     }
//     return config;
//   });

export const post = (url,data,config)=>instance.post(url,data,config)
export const put = (url,data,config)=>instance.put(url,data,config)
export const get  = (url,config)=>instance.get(url,config)
export const register = (url,value)=>instance.post(url,value)
export const deleteFacilityApi = (url,data)=>instance.delete(url,data)


// dashboard-admin-new.vercel.app
