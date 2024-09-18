import { useState } from "react";
import DataPicker from "../../common/DataPicker/index"



const Deneme = () => {



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
      <h3 className="mb-6">Çalışanların taşınmasından kaynaklı emilsyonlar</h3>
      <div className='grid grid-cols-1'>
        <DataPicker />
      </div>
      <h4 className="mt-4 font-bold">Şahsi Araçlar</h4>
      <div>
        <div className='grid grid-cols-4 gap-3 my-5'>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Plaka</label>
            <input
              type="text"
              name='miktar'
              className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Plaka girin"
              required
            />
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Yakıt Türü</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Yakıt türü seçin</option>
              <option>Dizel</option>
              <option>LPG</option>
              <option>Benzin</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Birim</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Birim türü seçin</option>
              <option>Litre</option>
              <option>Ton</option>
              <option>m3</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Miktar</label>
            <input
              type="text"
              name='miktar'
              className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Miktar girin"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={(e) => handleClick(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Araç Ekle</button>
        </div>

  {/* ============================================== */}
        <div class="relative overflow-x-auto table-backshadow sm:rounded-lg mt-8">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
              Şahsi Araçlar Listesi
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
        <hr className='mt-8' />

        <h4 className="mt-10 font-bold">Servis Araçlar</h4>
        <div className='grid grid-cols-4 gap-3 my-5'>
        <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Plaka</label>
            <input
              type="text"
              name='miktar'
              className="bg-gray-50 border border-gray-300 text-gray-900 h-8 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Plaka girin"
              required
            />
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Yakit Turu</label>
            <select onChange={(e) => handleChange(e)} value={state.yakitturu} name='yakitturu' id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Yakıt türü seçin</option>
              <option>Dizel</option>
              <option>LPG</option>
              <option>Benzin</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Birim</label>
            <select onChange={(e) => handleChange(e)} value={state.sofor} name='sofor' id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Birim seçin</option>
              <option>Ton</option>
              <option>lt</option>
              <option>m3</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Miktar</label>
            <input onChange={(e) => handleChange(e)} value={state.plaka} name='plaka' type="text" placeholder="Miktar girin" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none" />
          </div>
        </div>
        {/* ============================================== */}
        <div class="relative overflow-x-auto table-backshadow sm:rounded-lg mt-8">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
              Servis Araçlar Listesi
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
        <div className="flex justify-end mt-4">
          <button onClick={(e) => handleClick(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 mb-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Araç Ekle</button>
        </div>
        <hr />
        <h4 className="mt-4 font-bold">Müşteri Ziyaretleri Sonucu Oluşan Emilsyonlar</h4>
        <div className='grid grid-cols-4 gap-3 my-5'>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Yakit Turu</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Yakıt türü seçin</option>
              <option>Dizel</option>
              <option>LPG</option>
              <option>Benzin</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Sofor</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Şöför seçin</option>
              <option>Yusuf</option>
              <option>Ahmet</option>
              <option>Mehmet</option>
            </select>
          </div>
        </div>
        <h4 className="mt-4 font-bold">İş Seyahatleri</h4>
        <div className='grid grid-cols-5 gap-3 my-5'>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Seyahat Turu</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Seyahat türü seçin</option>
              <option>Ucak</option>
              <option>Tren</option>
              <option>Araba</option>
              <option>Gemi</option>

            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Kalkış Noktası</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Kalkış noktası seçin</option>
              <option>Yusuf</option>
              <option>Ahmet</option>
              <option>Mehmet</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Varış Noktası</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Varış noktası seçin</option>
              <option>Yusuf</option>
              <option>Ahmet</option>
              <option>Mehmet</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>Biniş İstasyonu</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>Biniş istasyonu seçin</option>
              <option>Yusuf</option>
              <option>Ahmet</option>
              <option>Mehmet</option>
            </select>
          </div>
          <div className="block w-full">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-full" style={{ display: 'block' }}>İniş İstasyonu</label>
            <select id="cities" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none">
              <option>İniş istasyonu seçin</option>
              <option>Yusuf</option>
              <option>Ahmet</option>
              <option>Mehmet</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  )
}


export default Deneme;