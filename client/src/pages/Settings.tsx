import { Input } from '@material-tailwind/react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/profile.webp';
import { useEffect, useState } from 'react';
import { userAuth } from '../auth/userAuth';
import { post, get, put } from "../server/Apiendpoint"
import { handleSuccess } from '../common/utils/helpers';
import { handleErrorForFacility } from '../common/utils/helpers'
import { ClipLoader } from 'react-spinners';



const Settings = () => {
  const { user, token } = userAuth();
  const [checkInput, setCheckInput] = useState(false)
  const [checkOnChange, setCheckOnChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const localFacility = localStorage.getItem('Facilityname')
  const localFacilityDetail = JSON.parse(localStorage.getItem("facilityInformation"))

  const tesisNumber = localFacilityDetail?._id
  useEffect(() => {
    if (localFacility === '' || !localFacility) {
      handleErrorForFacility("Lütfen önce bilgilerini girmek istediğiniz tesisi seçin.");
    } else {
      setCheckInput(true);
    }

    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + token
        }
      };

      const settingComeData = await get('/getfacilityinfo', config);
      const summarySetting = settingComeData?.data?.data;
      console.log("gelen veri-----------",summarySetting)
      localStorage.setItem("facilityInfoDetail", JSON.stringify(summarySetting));

      const resultInfo = settingComeData?.data?.data;
      setData({
        companyName: resultInfo?.companyName || "Tesis Seçilmedi",
        fieldActivity: resultInfo?.fieldActivity || "",
        workerCount: resultInfo?.workerCount || "",
        totalArea: resultInfo?.totalArea || "",
        cknNumber: resultInfo?.cknNumber || "",
        companyNumber: resultInfo?.companyNumber || "",
        companyMail: resultInfo?.companyMail || "",
        companyWebsite: resultInfo?.companyWebsite || "",
        address: resultInfo?.address || "",
        closeArea: resultInfo?.closeArea || "",
        openArea: resultInfo?.openArea || ""
      });
    };

    fetchData();
  }, [localFacility]); // localFacility değiştiğinde tekrar çalışır
  
  const [data, setData] = useState({
    companyName: " ",
    cknNumber: "",
    companyNumber: "",
    companyMail: "",
    companyWebsite: "",
    fieldActivity: "",
    closeArea: "",
    openArea: "",
    workerCount: "",
    totalArea: "",
    address: "",
    id: tesisNumber
  })
  console.log("data--network--", data)
  const changeSave = (event) => {

    setData({
      companyName: '',
      cknNumber: '',
      companyNumber: '',
      companyMail: '',
      companyWebsite: '',
      productArea: '',
      closeArea: '',
      openArea: '',
      workerCount: '',
      totalArea: '',
      address: '',
      id: tesisNumber
    })

    console.log("daata-----", data)
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });

    console.log("icerde", data)

  }
  // console.log("result",data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("VLUE",value)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token
      }
    };
    try {
      const loginuser = await get("/facilityinfo", data, config)
      const response = loginuser.data

      if (response.success) {

        handleSuccess(response.message)
        // setUser(response.data.user)

      }
    } catch (error) {
      console.log(error)

    }
  };

  const InputControl = () => {
    if (localFacility === '' || !localFacility) {
      handleErrorForFacility('Değişiklik yapmak için önce tesis seçmelisiniz.')
      setCheckInput(false)
    }

  }

  const handleUpdateFacilityInfo = async (e) => {
    setLoading(true);
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token
      }
    };

    // Sadece değişen verileri göndermek için, disabled inputları dışarıda bırakıyoruz
    const updatedData = {
      cknNumber: data.cknNumber,
      companyNumber: data.companyNumber,
      companyMail: data.companyMail,
      companyWebsite: data.companyWebsite,
      address: data.address,
      closeArea: data.closeArea,
      openArea: data.openArea,
      id: tesisNumber
    };

    try {
      const updateFacilityInfo = await put('/facilityinfoupdate', updatedData, config);
      console.log("Updated successfully:", updateFacilityInfo);
      
      if (updateFacilityInfo.status === 200) {
        toast.success("Bilgiler başarıyla güncellendi!");
      } else {
        toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };


  return (

    <>
      <div className="mx-auto max-w-700">
        <Breadcrumb pageName="Tesis Bilgileri" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-12">
            <form >
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* Profil bilgileri */}
                <div >
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Yetkili Kişi (Tesis Yetkilisi)
                    </h3>
                  </div>
                  <div className="mb-4 flex items-center gap-3 px-7 py-2">
                    <div className="h-14 w-14 rounded-full" >
                      <img src={userThree} alt="User" style={{ borderRadius: "50%" }} />
                    </div>
                    <div>
                      <span className="font-bold text-black  mb-1.5 text-black dark:text-white">
                        {user?.username}
                      </span>
                      <span className="flex gap-2.5">
                        {user}

                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-7 flex grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 " >
                  <div className="sirketbilgileri basis-1/2 " >
                    <div className="border-b w-125 border-stroke py-4  dark:border-strokedark">
                      <h1 className="font-bold text-xl text-black dark:text-white">
                        TESİS BİLGİLERİ
                      </h1>
                    </div>
                    <div className=" sm:w-1/2">
                      <label
                        className="my-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Tesis Adı
                      </label>
                      <div className="relative">
                        
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={data.companyName}
                          disabled                         
                        />
                      </div>
                    </div>

                    <div className=" sm:w-1/2 py-3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        ÇKN Numarası
                      </label>
                      <div className="relative">

                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="cknNumber"
                          id="fullName"
                          onChange={(e) => setData({...data, cknNumber: e.target.value})}

                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2 ">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="phoneNumber"
                      >
                        Telefon Numarası
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="companyNumber"
                        id="phoneNumber"
                        value={data.companyNumber}
                        onChange={(e) => setData({...data, companyNumber: e.target.value})}
                      />
                    </div>


                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Mail
                      </label>
                      <div className="relative">
                     
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          name="companyMail"
                          id="emailAddress"
                          value={data.companyMail}
                          onChange={(e) => setData({...data, companyMail: e.target.value})}

                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Website
                      </label>
                      <div className="relative">
                       
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="emailAddress"
                          name='companyWebsite'
                          value={data.companyWebsite}
                          onChange={(e) => setData({...data, companyWebsite: e.target.value})}

                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Adres
                      </label>
                      <div className="relative">
                       
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="address"
                          name='address'
                          value={data.address}
                          onChange={(e) => setData({...data, address: e.target.value})}

                        />
                      </div>
                    </div>


                  </div>

                  <div className='tesisbilgisi basis-1/2'>
                    <div className="border-b w-125 border-stroke  mt-7 py-4  dark:border-strokedark">
                      
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="my-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Üretim / Faliyet Alanı
                      </label>
                      <div className="w-full sm:w-1/2 mb-5.5">

                        <div className="relative">
                          <span className="absolute left-4.5 top-2">
                          
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="productArea"
                            id="emailAddress"
                            value={data.fieldActivity}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Kapalı Alan
                      </label>
                      <div className="relative">
            
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="closeArea"
                          id="emailAddress"
                          value={data.closeArea}
                          onChange={(e) => setData({...data, closeArea: e.target.value})}



                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Açık Alan
                      </label>
                      <div className="relative">
                       
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="openArea"
                          id="emailAddress"
                          value={data.openArea}
                          onChange={(e) => setData({...data, openArea: e.target.value})}

                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Çalışan Sayısı
                      </label>
                      <div className="relative">
                        
                        <input
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="workerCount"
                          id="emailAddress"
                          value={data.workerCount}
                          disabled


                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                        htmlFor="emailAddress"
                      >
                        Toplam Alan
                      </label>
                      <div className="relative">
                       
                        <input
                          onChange={changeSave}
                          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="totalArea"
                          id="emailAddress"
                          value={data.totalArea}


                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* BUTTON */}
                {checkInput ? <div className="flex justify-end gap-4.5 p-4">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    İptal
                  </button>

                  <button
                    onClick={() => { handleUpdateFacilityInfo() }}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded shadow-lg"
                    style={{
                      background: "linear-gradient(to right, rgb(0, 255, 142), rgb(0, 160, 254))",
                    }}
                    disabled={loading} // İşlem sırasında buton devre dışı kalsın
                  >
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      null
                    )}
                    {loading ? "Güncelleniyor..." : "Güncelle"}
                  </button>



                </div> : null}

              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default Settings;
