import React, { useState } from "react";



import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const index = (props) => {
  
  const [startDate, setStartDate] = useState(new Date());


  const [data, setData] = useState({
    startDate: null,
    endDate: null
});
const handleChange = (newValue) => {
  


    setData(newValue)
    setStartDate(newValue)
    props.deneme(newValue)
    console.log("newwww",newValue)

}

const styles = {
  popup: {
      borderRadius: "10px",
      background:"red"
  }
}



  return (
    <div className="flex flex-col">
      {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
    <label className="mb-3">Lutfen kayit icin tarih secin</label>
      <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker>
    </div>

    
  )
}

export default index




