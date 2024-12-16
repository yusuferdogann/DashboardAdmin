import React, { useEffect, useState } from 'react'
import { userAuth } from '../../auth/userAuth';
import { handleSuccess } from '../../common/utils/helpers';
import { post } from '../../server/Apiendpoint';
import {CalculateFuction} from "../../common/utils/calculateFunction"

const PersonalCar = (props) => {
 
  const { facilitySend,token } = userAuth();

 
  const styles = {
    input: {
      normal: 'bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'
    },
    select: {
      normal: 'h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none',
      error: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-1 px-4 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 h-8'

    }
  }
  var currentdate = new Date(); 
  var datetime =    currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear()  
                  // + currentdate.getHours() + ":"  
                  // + currentdate.getMinutes() + ":"
                  // + currentdate.getMilliseconds()
  // console.log("date-time",datetime)
  const [personalData, setPersonalData] = useState(
    { 
      tarih:datetime,
      title: 'SCOPE-3', 
      subtitle: 'Downstream Nakliye hizmetin dışardan satın alınması durumunda)', 
      kaynak: '', 
      yakitturu:'',
      birim: '', 
      miktar: '',
      ulke:facilitySend?.country,
      sehir:facilitySend?.city,
      ilce:facilitySend?.state,
      tesis:facilitySend?.facilityname,
      situation:'',
      type:'Şahsi Araçlar'
     }
  );

    const [state, setState] = useState([])
    const [change,setChange] = useState(false)
    const [load, setLoad] = useState(false)
    const initialValues = {kaynak:personalData.kaynak, yakitturu:personalData.yakitturu, miktar: personalData.miktar, birim:personalData.birim, situation: personalData.situation}
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false)
    const [listData,setListData] = useState([])
    const [dublicate,setDublicate] = useState(false)

   


    // const [personalData, setPersonalData] = useState({ yakitturu: '', birim: '', kaynak: '',miktar:'',situation:'' })
  
    // const handleChange = (e) => {
    //   setUser({
    //     ...user,
    //     [e.target.name]: e.target.value,
  
    //   });
    // }
  
    const handleClick = () => {
      setState([...state, { user }])
    }
    // console.log("user", user)
    // console.log("state", state)
    const changePersonal = (event)=>{
      if(event.target.textContent==='Lütfen kayıt için dönem/ay seçinDönem olarak kayıtAy olarak kayıt'){
        setChange(Number(event.target.value))
      }
      // console.log(change)
      const {name,value}=event.target
      setPersonalData({...personalData,[name]:value})
      console.log("personaldata",personalData)
      setFormValues({...formValues,[name]:value})





      // console.log("savedDataScope4------------",props.savedDataScope4)

      // console.log("fuction---------",props.setSavedDataScope4)

    }
    const handleValidation = async (event)=>{
      event.preventDefault();
      const {name,value} = event.target;
      // setListData({...formValues,[name]:value})
         const funcMiktar = personalData?.miktar
         const funcKaynak =  personalData?.yakitturu;
         CalculateFuction(funcKaynak,funcMiktar)
         console.log("gasType yok---------")
         console.log("func---====",CalculateFuction(funcKaynak,funcMiktar))
         console.log("funcKaynak---------",funcKaynak)
         console.log("funcMiktar---------",typeof(funcMiktar))
        setFormErrors(validate(formValues));
        setIsSubmit(true)
        console.log(formErrors)
        const config = {
          headers:{
              "Content-Type":"application/json",
              Authorization:"Bearer: "+token
            }
          };
          const personalDataLast = { 
            tarih:datetime,
            title: 'SCOPE-3', 
            subtitle: 'Downstream Nakliye hizmetin dışardan satın alınması durumunda)', 
            kaynak: personalData?.kaynak, 
            yakitturu:personalData?.yakitturu,
            birim: personalData?.birim, 
            miktar: CalculateFuction(funcKaynak,funcMiktar)?.toFixed(2),
            ulke:facilitySend?.country,
            sehir:facilitySend?.city,
            ilce:facilitySend?.state,
            tesis:facilitySend?.facilityname,
            situation:personalData?.situation,
            type:'Şahsi Araçlar'
           }

           if(personalDataLast.kaynak ==='' || personalDataLast.miktar ==='' || personalDataLast.birim === ''){
            const formValues = {
              kaynak:'',
              miktar:'',
              birim:'',
              situation:''
            }
            setFormErrors(validate(formValues));
          }
          else{
            const dataResult = await post('/adddata',personalDataLast,config);
            props.setListData([...props.listData,{kaynak:personalData.kaynak,birim:personalData.birim,situation:personalData.situation,miktar:CalculateFuction(funcKaynak,funcMiktar)?.toFixed(2)}])
  
            handleSuccess('PersonalCar Scope3 başarıyla kayt edildi.')
            // console.log("saved3-------",savedDataScope3)
            console.log("result-data",dataResult)
  
            setPersonalData({ 
              tarih:datetime,
              title: 'SCOPE-3', 
              subtitle: 'Downstream Nakliye hizmetin dışardan satın alınması durumunda)', 
              kaynak: '', 
              yakitturu:'',
              birim: '', 
              miktar: '',
              ulke:facilitySend?.country,
              sehir:facilitySend?.city,
              ilce:facilitySend?.state,
              tesis:facilitySend?.facilityname,
              situation:'',
              type:'Şahsi Araçlar'
             })
          }
        
       

    
      }
      useEffect(()=>{
        // console.log("useEffect-ust",formErrors)
      
    
        if(Object.keys(formErrors).length === 0 && isSubmit){
          const isEmpty = (obj) => { 
            return Object.keys(obj).length === 0; 
          }; 
          
          
          console.log(formErrors); // true 
         
        }
      },[formErrors]);
    
      const validate = (values)=>{
        const errors={}
        if(!values.kaynak){
          errors.kaynak = "Bu alan boş bırakılamaz.";
        }
        if(!values.birim){
          errors.birim = "Bu alan boş bırakılamaz.";
        }
        if(!values.miktar){
          errors.miktar = "Bu alan boş bırakılamaz.";
        }
        if(!values.situation){
          errors.situation = "Bu alan boş bırakılamaz.";
        }
        if(!values.yakitturu){
          errors.yakitturu = "Bu alan boş bırakılamaz.";
        }
    
    
        return errors;
      }
      // console.log("personaldata---------------",personalData.kaynak)
      // console.log("Acordion-data--------------",props.savedDataScope4.kaynak )
      // console.log("Error-kaynak---------------",formErrors.kaynak)

  return (
    <>
    <form onSubmit={(event)=>handleValidation(event)}>
        <div className="grid grid-cols-1 w-200 " >
      <div className="flex flex-col my-4">
        {/* <Datepicker  i18n={"tr"} value={data} onChange={(newValue)=>handleChange(newValue)} /> */}
        <div>
        { change===false ? <i class="fa-solid fa-triangle-exclamation text-2xl" style={{color:"#d46c6c"}}></i> : null}
        <label className="mb-3 ms-3 text-xl">Lütfen kayıt için dönem <span className="font-bold">veya</span> ay seçin</label>
        </div>
        <div className="mt-7">
          <select  value={personalData.situation} name='situation' className={formErrors.kaynak ? styles.select.error : styles.select.normal} onChange={(event)=>changePersonal(event)}>
            <option value='0'>Lütfen kayıt için dönem/ay seçin</option>
            <option value='4'>Dönem olarak kayıt</option>
            <option value='5'>Ay olarak kayıt</option>
          </select>
          <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.situation}</small> 
        </div>
       

        {
          change === 4 ? <div className="donem mt-7 ">
          <select className={styles.select.normal} name='situation' value={personalData.situation}  onChange={(event) => changePersonal(event)}>
            <option>Lütfen kayıt için dönem girin</option>
            <option value='Ocak - Mart'>Ocak - Mart</option>
            <option value='Nisan - Haziran'>Nisan - Haziran</option>
            <option value='Temmuz - Eylül'>Temmuz - Eylül</option>
            <option value='Ekim - Aralık'>Ekim - Aralık</option>
          </select>
        </div> : null
        }
      </div>
    {
      change === 5 ?   <div className="ay">
      <select className={styles.select.normal}  name='situation' value={personalData.situation}  onChange={(event) => changePersonal(event)}>
        <option>Lütfen kayıt için ay girin</option>
        <option value='Ocak'>Ocak</option>
        <option value='Şubat'>Şubat</option>
        <option value='Mart'>Mart</option>
        <option value='Nisan'>Nisan</option>
        <option value='Mayıs'>Mayıs</option>
        <option value='Haziran'>Haziran</option>
        <option value='Temmuz'>Temmuz</option>
        <option value='Ağustos'>Ağustos</option>
        <option value='Eylül'>Eylül</option>
        <option value='Ekim'>Ekim</option>
        <option value='Kasım'>Kasım</option>
        <option value='Aralık'>Aralık</option>
      </select>
    </div> : null
    }



 {/* <DatePicker selected={startDate} onChange={(date) => handleChange(date)}>
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    </DatePicker> */}
        </div>


         <h4 className="mt-10 font-bold">Şahsi Araçlar</h4>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>kaynak</label>
            <input
              type="text"
              name='kaynak'
              value={personalData.kaynak}
              onChange={(event)=>changePersonal(event)}
              className={formErrors.kaynak ? styles.select.error : styles.select.normal}
              placeholder="kaynak girin"
              
            />
            <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.kaynak}</small> 

          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Yakıt Türü</label>
            <select value={personalData.yakitturu} name='yakitturu' id="cities" className={formErrors.yakitturu ? styles.select.error : styles.select.normal} onChange={(event)=>changePersonal(event)}>
              <option>Yakıt türü seçin</option>
              <option>Dizel Yakıt</option>
              <option>Sıvılaştırılmış Petrol Gazları (LPG)</option>
              <option>Benzin</option>
            </select>
            <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.yakitturu}</small> 
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Birim</label>
            <select value={personalData.birim} onChange={(event)=>changePersonal(event)} name='birim' id="cities" className={formErrors.birim ? styles.select.error : styles.select.normal}>
              <option>Birim seçin</option>
              <option>Litre</option>
       
            </select>
            <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.birim}</small> 

          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Miktar</label>
            <input
              type="text"
              name='miktar'
              value={personalData.miktar}
              onChange={(event)=>changePersonal(event)}
              className={formErrors.miktar ? styles.select.error : styles.select.normal}
              placeholder="Miktar girin"
            />
            <small className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{formErrors.miktar}</small> 

          </div>
          
        </div>

        <div className='flex justify-end mt-4'>
          <button type="submit" className="relative inline-flex items-center justify-center p-2 w-30 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    {
                      load ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg> : null
                    }
                    {load ? 'Kaydediliyor' : "Kaydet"}
                  </button>
          </div>
        {/* <div className="flex justify-end mt-4">
          <button onClick={(e) => handleClick(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Araç Ekle</button>
        </div> */}
        {/*======================== tablo  ================= */}
        {/* <div class="relative overflow-x-auto table-backshadow sm:rounded-lg mt-8">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
              Şahsi Araçlar Listesi
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  kaynak
                </th>
                <th scope="col" class="px-6 py-3">
                  Yakıt Türü
                </th>
                <th scope="col" class="px-6 py-3">
                  Birim
                </th>
                <th scope="col" class="px-6 py-3">
                  Miktar
                </th>
              </tr>
            </thead>
            {
              state.map((item) => (
                <tbody >
                  <tr class="border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.user.yakitturu}
                    </th>
                    <td class="px-6 py-4">
                      {item.user.sofor}
                    </td>
                    <td class="px-6 py-4">
                      {item.user.kaynak}
                    </td>

                    <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                  </tr>
                </tbody>
              ))
            }
          </table>
        </div> */}
        {/* ================================================ */}
        </form>
    </>
  )
}

export default PersonalCar