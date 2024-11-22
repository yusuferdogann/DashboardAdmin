import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import PdfView from "../components/Pdf/PdfView";
 
export default function DialogSizes() {
  const [size, setSize] = React.useState(null);
  const [change,setChange] = useState(false)
  const [pdfcontrol,setPdfControl] = useState(false)
  
  const initialValues = {situation:'',period:'',mounth:'',report:'',scope:''}
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false)
  const styles = {
    input: {
      normal: 'bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'
    },
    select: {
      normal: 'h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-1 px-4 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'

    },
    text: {
      normal: 'h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none',
      error: 'text-red-900'

    }
  }
 
  const handleOpen = (value) => setSize(value);
  const changeControl = (event)=>{
    const {name,value} = event.target;
    console.log(event.target.value,"valuuuuu")
    setChange(Number(event.target.value))
    setFormValues({...formValues,[name]:value})
    console.log("form------",formValues)

  }

  const downloadPdf = ()=>{

      if(isSubmit===false){
        setIsSubmit(true)
      
    }
    else{
      handleOpen(null)
      setPdfControl(true)
      setIsSubmit(false)
      setChange(false)

    }
    
  }
  return (
    <>
      <Breadcrumb pageName="Rapor" />
      <div className="mb-3 flex gap-3">
        
        {/* <Button  onClick={() => handleOpen("sm")} color="blue" variant="gradient">
          Rapor Al
        </Button> */}
      </div>

        <PdfView />   

      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader>RAPOR AL</DialogHeader>
        <DialogBody>
        <div className="grid grid-cols-1 w-200 " >
      <div className="flex flex-col mb-4">
        {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
        <div>
        { change===false ? <i className="fa-solid fa-triangle-exclamation text-2xl" style={{color:"#d46c6c"}}></i> : null}
        <label className="mb-3 ms-3 text-xl">Lütfen rapor için dönem <span className="font-bold">veya</span> ay seçin</label>
        </div>
        <div className="mt-7">
          <select name='situation' value={formValues.situation} className='py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none' onChange={(event)=>changeControl(event)}>
            <option>Lütfen rapor için dönem/ay seçin</option>
            <option value='4'>Dönem olarak rapor</option>
            <option value='5'>Ay olarak rapor</option>
          </select>
          { isSubmit ? <small className={styles.text.error}>Lütfen tüm alanları doldrun </small> : null}

        </div>
       
        {
          change === 4 ? <div className="donem mt-7 ">
          <select  name='period' className="py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
            <option>Lütfen rapor için dönem girin</option>
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
            <select  name='mounth' className="py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Lütfen rapor için ay girin</option>
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

        {
          change === 4 || change === 5 ? <div className="donem mt-7 cd  ">
          <select  name='scope'  className="py-1 px-4 h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
            <option>Lütfen kapsam seçin</option>
            <option>KAPSAM 1</option>
            <option>KAPSAM 2</option>
            <option>KAPSAM 3</option>
          </select>
        </div> : null
        }



 {/* <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker> */}
    </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => downloadPdf()}
          >
            <span>İndir</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}