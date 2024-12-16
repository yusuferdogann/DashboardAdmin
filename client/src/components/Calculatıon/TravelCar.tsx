import React, { useEffect, useRef, useState } from 'react'
import Deneme from "./airports.json"
import Select from 'react-select'


const TravelCar = (props) => {

  const isInitialMount = useRef(true);

  const [result, setResult] = useState([])

  // useEffect(() => {

  
  //     Deneme.map((el) => {
  //       setResult((prevState)=>({...prevState,label: el.name }));
  //     })
    

  // },[result])

  // console.log("data------------", result)
  // const options = result
  const options = [
{label:'Araba', value:'a'},   
{label:'Uçak' , value:'u'}
  ]


  const [state, setState] = useState([])
  const [user, setUser] = useState({ yakitturu: '', sofor: '', plaka: '' })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,

    });
  }

  const handleClick = () => {
    setState([...state, { user }])
  }
  // console.log("user", user)
  // console.log("state", state)

  return (
    <div className='relative' style={{height:'300px',width:'100%'}}>
       <div role="status" className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-30 backdrop-blur-sm"
                style={{ opacity: '1', position: 'absolute', top: '0', left: '0', zIndex: '12',borderRadius:'10px',width:'100%',height:'100%' }}>
                  <div className='' style={{zIndex:'122',left:'40%',position:'absolute',top:'40%',color:'red',transform:'transform(-50%,-50%)',borderRadius:'10px'}}>İş Seyahati Modülü Yakında</div>
                {/* <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg> */}
            </div>
    <div style={props.travelCarControl === false ? {display:'none'} : {display:'block'}}>
        <h4 className="mt-10 font-bold">İş Seyahati Sonucu Oluşan Emilsyonlar</h4>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <div className="block w-full">
          <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Seyahat Turu</label>
          <Select
           options={options}
          // isLoading={true}
          />

        </div>
        <div className="block w-full">
          <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Kalkış Noktası</label>
          <Select
           options={options}
          // isLoading={true}
          />



        </div>
        <div className="block w-full">
          <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Varış Noktası</label>
          <Select
           options={options}
          // isLoading={true}
          />
        </div>
        <div className="block w-full">
          <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Yolcu Sayısı</label>
          <input
            type="text"
            name='miktar'
            className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Yolcu sayısı girin"
            required
          />
        </div>

      </div>
      {/* ============================================== */}
      <div class="relative overflow-x-auto table-backshadow sm:rounded-lg mt-8">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
            İş Seyahatleri Araçlar Listesi
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Plaka
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
                    {item.user.plaka}
                  </td>

                  {/* <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td> */}
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
      {/* =============================================== */}
    </div>
    
    </div>
  )
}

export default TravelCar