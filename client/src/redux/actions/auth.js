import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const registerAction = (authData) => async(dispatch)=>{

  try{
      const {data} = await axios.post("/register",authData)
      console.log(data)
      dispatch({type:'REGISTER',payload:data})
      window.location= "/"
      toast(data.msg,{
        position:"top-right",
        autoClose:5000,
    })
  } catch(error){
      toast(error.response.data.msg,{
          position:"top-right",
          autoClose:5000,
      })
  }


};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post("https://dashboard-admin-ns4k.vercel.app/login", authData);
    dispatch({ type: "LOGIN", payload: data });
    window.location = "/";
  } catch (error) {
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
