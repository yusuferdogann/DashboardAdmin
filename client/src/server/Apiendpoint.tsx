import axios from "axios"

export const instance = axios.create({
    // baseURL:'https://dashboard-admin-lovat.vercel.app'

    // =====Vercel guncel api backend======
    // baseURL:'https://dashboard-admin-weld.vercel.app/auth' 
       // =====Render guncel api backend======
       baseURL:'https://dashboardadmin-ck5v.onrender.com/auth' 

    // yaallah

    // =====local api // 24.11.2024 // ==========
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
export const login = (url,data) =>instance.post(url,data)
export const post = (url,data,config)=>instance.post(url,data,config)
export const put = (url,data,config)=>instance.put(url,data,config)
export const get  = (url,config)=>instance.get(url,config)
export const register = (url,value)=>instance.post(url,value)
export const deleteFacilityApi = (url,data)=>instance.delete(url,data)


// dashboard-admin-new.vercel.app
