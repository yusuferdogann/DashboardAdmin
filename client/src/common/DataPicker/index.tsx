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
 <div className="grid grid-cols-4 w-200">
     <div className="flex flex-col">
      {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
    <label className="mb-3">Lütfen kayıt için dönem seçin</label>
      {/* <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker> */}
    <div>
      <select>
        <option>Lütfen kayıt için dönem girin</option>
      <option>Ocak - Mart</option>
      <option>Nisan - Haziran</option>
      <option>Temmuz - Eylül</option>
      <option>Ekim - Aralık</option>

      </select>
      
      </div>
    </div>
    <span className="text align text-center font-bold">VEYA</span>
    <div className="flex flex-col">
    <label className="mb-3">Lütfen kayıt için ay seçin</label>
      <select>
      <option>Lütfen kayıt için ay girin</option>
        <option>Ocak</option>
        <option>Şubat</option>
        <option>Mart</option>
        <option>Nisan</option>
        <option>Mayıs</option>
        <option>Haziran</option>
        <option>Temmuz</option>
        <option>Ağustos</option>
        <option>Eylül</option>
        <option>Ekim</option>
        <option>Kasım</option>
        <option>Aralık</option>
        </select>
    </div>

 </div>
    
  )
}

export default index




