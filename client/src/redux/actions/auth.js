import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const registerAction = (authData) => async(dispatch)=>{

  try{
      const {data} = await axios.post("/register",authData)
      console.log("dataaaaaaaaa",data)
      dispatch({type:'REGISTER',payload:data})
      window.location= "/"
      toast(data.msg,{
        position:"top-right",
        autoClose:2000,
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
    const { data } = await axios.post("/login", authData);
    dispatch({ type: "LOGIN", payload: data });
    toast(data.msg,{
      position:"top-right",
      autoClose:2000,
  })
    window.location = "/";
   
  } catch (error) {
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 2000,
    });
  }
};
