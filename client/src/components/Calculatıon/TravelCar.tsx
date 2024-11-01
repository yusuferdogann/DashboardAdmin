import React, { useEffect, useRef, useState } from 'react'
import Deneme from "./airports.json"
import Select from 'react-select'


const TravelCar = () => {

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
  console.log("user", user)
  console.log("state", state)

  return (
    <div>
      <h4 className="mt-10 font-bold">İş Seyahati Sonucu Oluşan Emilsyonlar</h4>
      <div className='grid grid-cols-4 gap-3 my-5'>
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
  )
}

export default TravelCar