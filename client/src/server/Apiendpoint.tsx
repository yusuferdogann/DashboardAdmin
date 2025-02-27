import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/auth",
  // baseURL:'https://app.carbonistan.com/auth',
});

// 401 hatalarını yakalamak için interceptor ekleyelim
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("sessionExpired")); // Global event fırlat
    }
    return Promise.reject(error);
  }
);

// API metodlarını export etmeye devam edelim
export const login = (url, data) => instance.post(url, data);
export const post = (url, data, config) => instance.post(url, data, config);
export const put = (url, data, config) => instance.put(url, data, config);
export const get = (url, config) => instance.get(url, config);
export const register = (url, value) => instance.post(url, value);
export const deleteFacilityApi = (url, data) => instance.delete(url, data);
