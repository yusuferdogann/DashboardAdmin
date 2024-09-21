import React, { useState } from "react";



import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const index = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [hidden,setHidden] = useState(false)


  const [data, setData] = useState({
    startDate: null,
    endDate: null
  });
  const [change,setChange] = useState(false)
  const handleChange = (newValue) => {
    setData(newValue)
    setStartDate(newValue)
    props.deneme(newValue)
    console.log("newwww", newValue)

  }

  const styles = {
    popup: {
      borderRadius: 'bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      background: "red"
    }
  }
  const changeControl = (event)=>{
    console.log(event.target.value,"valuuuuu")
    setChange(Number(event.target.value))
  }


  return (
    <div className="grid grid-cols-1 w-200 " >
      <div className="flex flex-col mb-4">
        {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
        <div>
        { change===false ? <i class="fa-solid fa-triangle-exclamation text-2xl" style={{color:"#d46c6c"}}></i> : null}
        <label className="mb-3 ms-3 text-xl">Lütfen kayıt için dönem <span className="font-bold">veya</span> ay seçin</label>
        </div>
        <div className="mt-7">
          <select className='py-1 px-4 border' onChange={(event)=>changeControl(event)}>
            <option>Lütfen kayıt için dönem/ay seçin</option>
            <option value='4'>Dönem olarak kayıt</option>
            <option value='5'>Ay olarak kayıt</option>
          </select>
        </div>
       

        {
          change === 4 ? <div className="donem mt-7 ">
          <select className="py-1 px-4 border">
            <option>Lütfen kayıt için dönem girin</option>
            <option>Ocak - Mart</option>
            <option>Nisan - Haziran</option>
            <option>Temmuz - Eylül</option>
            <option>Ekim - Aralık</option>
          </select>
        </div> : null
        }
      </div>
    {
      change === 5 ?   <div className="ay">
      <select className="py-1 px-4 border">
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
    </div> : null
    }



 {/* <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker> */}
    </div>

  )
}

export default index




