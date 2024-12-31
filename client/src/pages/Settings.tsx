import { Input } from '@material-tailwind/react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/profile.webp';
import { useEffect, useState } from 'react';
import { userAuth } from '../auth/userAuth';
import { post,get } from "../server/Apiendpoint"
import { handleSuccess } from '../common/utils/helpers';
import { handleErrorForFacility } from '../common/utils/helpers'



const Settings = () => {
  const {user,token} = userAuth();
  const [checkInput,setCheckInput] = useState(false)
  const [settingData,setSettingData] = useState<State>({});
  const localFacility = localStorage.getItem('Facilityname')
  const localData = JSON.parse(localStorage.getItem("facilityInfoDetail"));
  const localFacilityDetail = JSON.parse(localStorage.getItem("facilityInformation"))

console.log("user----------",localFacilityDetail)

useEffect(()=>{
  if(localFacility === '' ||  !localFacility){
    handleErrorForFacility("Lütfen önce bilgilerini girmek istediğiniz tesisi seçin.") 
}
else{
  setCheckInput(true)
}
  const fetchData = async() => {
    const config = {
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer: "+token
      }
          };
          const settingComeData = await get('/getfacilityinfo',config);
          const summarySetting = settingComeData?.data?.data;
          // console.log("sumsumsum",summarySetting)
          localStorage.setItem("facilityInfoDetail",JSON.stringify(summarySetting))
          console.log("selam settings----",settingComeData);
          setSettingData(settingComeData)


  }
  fetchData()

},[])



let [data,setData] = useState({
    // name:user.username,
    companyName:localData?.companyName,
    cknNumber:localData?.cknNumber,
    companyNumber:localData?.companyNumber,
    companyMail:localData?.companyMail,
    companyWebsite:localData?.companyWebsite,
    // productArea:localData?.productArea,
    closeArea:localData?.closeArea,
    openArea:localData?.openArea,
    workerCount:localData?.workerCount,
    totalArea:localData?.totalArea,
    address:localData?.address,
  })
  const changeSave = (e)=>{

     e.preventDefault()
     setData({
        ...data,
        [e.target.name]: e.target.value,
      });
      console.log("result",data)
  

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("VLUE",value)
    const config = {
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer: "+token
      }
          };
    try {
      const loginuser = await post("/facilityinfo",data,config)
      const response = loginuser.data

      if (response.success) {

        handleSuccess(response.message)
        // setUser(response.data.user)

      }
    } catch (error) {
      console.log(error)

    }
  };

  const InputControl = () =>{
    if(localFacility === '' || !localFacility){
      handleErrorForFacility('Değişiklik yapmak için önce tesis seçmelisiniz.')
      setCheckInput(false)
    }
    
  }



  return (
    // <>
    //   <div className="mx-auto max-w-270">
    //     <Breadcrumb pageName="Ayarlar" />

    //     <div className="grid grid-cols-5 gap-8">
    //       <div className="col-span-5 xl:col-span-3">
    //         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    //           <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
    //             <h3 className="font-medium text-black dark:text-white">
    //               Tesis Bilgileri
    //             </h3>
    //           </div>
    //           <div className="p-7">
    //             <form action="#">
    //               <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
    //                 <div className="w-full sm:w-1/2">
    //                   <label
    //                     className="mb-3 block text-sm font-medium text-black dark:text-white"
    //                     htmlFor="fullName"
    //                   >
    //                     Tesis Adı
    //                   </label>
    //                   <div className="relative">
    //                     <span className="absolute left-4.5 top-4">
    //                       <svg
    //                         className="fill-current"
    //                         width="20"
    //                         height="20"
    //                         viewBox="0 0 20 20"
    //                         fill="none"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                       >
    //                         <g opacity="0.8">
    //                           <path
    //                             fillRule="evenodd"
    //                             clipRule="evenodd"
    //                             d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
    //                             fill=""
    //                           />
    //                           <path
    //                             fillRule="evenodd"
    //                             clipRule="evenodd"
    //                             d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
    //                             fill=""
    //                           />
    //                         </g>
    //                       </svg>
    //                     </span>
    //                     <input
    //                       className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //                       type="text"
    //                       name="fullName"
    //                       id="fullName"
    //                       placeholder="Devid Jhon"
    //                       defaultValue="Devid Jhon"
    //                     />
    //                   </div>
    //                 </div>

    //                 <div className="w-full sm:w-1/2">
    //                   <label
    //                     className="mb-3 block text-sm font-medium text-black dark:text-white"
    //                     htmlFor="phoneNumber"
    //                   >
    //                     Tesis Numarası
    //                   </label>
    //                   <input
    //                     className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //                     type="text"
    //                     name="phoneNumber"
    //                     id="phoneNumber"
    //                     placeholder="+990 3343 7865"
    //                     defaultValue="+990 3343 7865"
    //                   />
    //                 </div>
    //               </div>

    //               <div className="mb-5.5">
    //                 <label
    //                   className="mb-3 block text-sm font-medium text-black dark:text-white"
    //                   htmlFor="emailAddress"
    //                 >
    //                   Mail Adresi
    //                 </label>
    //                 <div className="relative">
    //                   <span className="absolute left-4.5 top-4">
    //                     <svg
    //                       className="fill-current"
    //                       width="20"
    //                       height="20"
    //                       viewBox="0 0 20 20"
    //                       fill="none"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                     >
    //                       <g opacity="0.8">
    //                         <path
    //                           fillRule="evenodd"
    //                           clipRule="evenodd"
    //                           d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
    //                           fill=""
    //                         />
    //                         <path
    //                           fillRule="evenodd"
    //                           clipRule="evenodd"
    //                           d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
    //                           fill=""
    //                         />
    //                       </g>
    //                     </svg>
    //                   </span>
    //                   <input
    //                     className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //                     type="email"
    //                     name="emailAddress"
    //                     id="emailAddress"
    //                     placeholder="devidjond45@gmail.com"
    //                     defaultValue="devidjond45@gmail.com"
    //                   />
    //                 </div>
    //               </div>

    //               {/* <div className="mb-5.5">
    //                 <label
    //                   className="mb-3 block text-sm font-medium text-black dark:text-white"
    //                   htmlFor="Username"
    //                 >
    //                   Username
    //                 </label>
    //                 <input
    //                   className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //                   type="text"
    //                   name="Username"
    //                   id="Username"
    //                   placeholder="devidjhon24"
    //                   defaultValue="devidjhon24"
    //                 />
    //               </div> */}

    //               <div className="mb-5.5">
    //                 <label
    //                   className="mb-3 block text-sm font-medium text-black dark:text-white"
    //                   htmlFor="Username"
    //                 >
    //                   Faliyet Alanı
    //                 </label>
    //                 <div className="relative">
    //                   <span className="absolute left-4.5 top-4">
    //                     <svg
    //                       className="fill-current"
    //                       width="20"
    //                       height="20"
    //                       viewBox="0 0 20 20"
    //                       fill="none"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                     >
    //                       <g opacity="0.8" clipPath="url(#clip0_88_10224)">
    //                         <path
    //                           fillRule="evenodd"
    //                           clipRule="evenodd"
    //                           d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
    //                           fill=""
    //                         />
    //                         <path
    //                           fillRule="evenodd"
    //                           clipRule="evenodd"
    //                           d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
    //                           fill=""
    //                         />
    //                       </g>
    //                       <defs>
    //                         <clipPath id="clip0_88_10224">
    //                           <rect width="20" height="20" fill="white" />
    //                         </clipPath>
    //                       </defs>
    //                     </svg>
    //                   </span>

    //                   <textarea
    //                     className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
    //                     name="bio"
    //                     id="bio"
    //                     rows={6}
    //                     placeholder="Write your bio here"
    //                     defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
    //                   ></textarea>
    //                 </div>
    //               </div>

    //               <div className="flex justify-end gap-4.5">
    //                 <button
    //                   className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
    //                   type="submit"
    //                 >
    //                   Cancel
    //                 </button>
    //                 <button
    //                   className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
    //                   type="submit"
    //                 >
    //                   Save
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-span-5 xl:col-span-2">
    //         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    //           <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
    //             <h3 className="font-medium text-black dark:text-white">
    //               Your Photo
    //             </h3>
    //           </div>
    //           <div className="p-7">
    //             <form action="#">
    //               <div className="mb-4 flex items-center gap-3">
    //                 <div className="h-14 w-14 rounded-full">
    //                   <img src={userThree} alt="User" />
    //                 </div>
    //                 <div>
    //                   <span className="mb-1.5 text-black dark:text-white">
    //                     Edit your photo
    //                   </span>
    //                   <span className="flex gap-2.5">
    //                     <button className="text-sm hover:text-primary">
    //                       Delete
    //                     </button>
    //                     <button className="text-sm hover:text-primary">
    //                       Update
    //                     </button>
    //                   </span>
    //                 </div>
    //               </div>

    //               <div
    //                 id="FileUpload"
    //                 className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
    //               >
    //                 <input
    //                   type="file"
    //                   accept="image/*"
    //                   className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
    //                 />
    //                 <div className="flex flex-col items-center justify-center space-y-3">
    //                   <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
    //                     <svg
    //                       width="16"
    //                       height="16"
    //                       viewBox="0 0 16 16"
    //                       fill="none"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         clipRule="evenodd"
    //                         d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
    //                         fill="#3C50E0"
    //                       />
    //                       <path
    //                         fillRule="evenodd"
    //                         clipRule="evenodd"
    //                         d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
    //                         fill="#3C50E0"
    //                       />
    //                       <path
    //                         fillRule="evenodd"
    //                         clipRule="evenodd"
    //                         d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
    //                         fill="#3C50E0"
    //                       />
    //                     </svg>
    //                   </span>
    //                   <p>
    //                     <span className="text-primary">Click to upload</span> or
    //                     drag and drop
    //                   </p>
    //                   <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
    //                   <p>(max, 800 X 800px)</p>
    //                 </div>
    //               </div>

    //               <div className="flex justify-end gap-4.5">
    //                 <button
    //                   className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
    //                   type="submit"
    //                 >
    //                   Cancel
    //                 </button>
    //                 <button
    //                   className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
    //                   type="submit"
    //                 >
    //                   Save
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="mx-auto max-w-700">
        <Breadcrumb pageName="Tesis Bilgileri" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-12">
          <form onSubmit={handleSubmit}>
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
                    <img src={userThree} alt="User"  style={{borderRadius:"50%"}}/>
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
              {/* Profil bilgileri */}

              
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
                      <span className="absolute left-4.5 top-2">
                        {/* <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg> */}
                         <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V17.875H8.6281C9.0406 17.875 9.41873 17.5312 9.41873 17.0844C9.41873 16.6375 9.07498 16.2937 8.6281 16.2937H6.77185V11.7906H8.6281C9.0406 11.7906 9.41873 11.4469 9.41873 11C9.41873 10.5875 9.07498 10.2094 8.6281 10.2094H6.77185V5.63749H8.6281C9.0406 5.63749 9.41873 5.29374 9.41873 4.84687C9.41873 4.39999 9.07498 4.05624 8.6281 4.05624H6.77185V2.74999C6.77185 2.40624 7.04685 2.13124 7.3906 2.13124H15.6406C15.9844 2.13124 16.2937 2.26874 16.5687 2.50937C16.8094 2.74999 16.9469 3.09374 16.9469 3.43749V18.5625Z"
                    fill=""
                  />
                </svg>
                      </span>
                      <input
                      onChange={changeSave}
                        className="w-full rounded border border-stroke bg-gray py-1 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="companyName"
                        value={data?.companyName ? data?.companyName : localFacilityDetail.facilityname}
                        id="fullName"
                        onMouseEnter={InputControl}
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
                      onChange={changeSave}
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="cknNumber"
                        id="fullName"
                        value={data.cknNumber}
                      
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
                    onChange={changeSave}
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="companyNumber"
                      id="phoneNumber"
                      value={data.companyNumber}

                     
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                        name="companyMail"
                        id="emailAddress"
                        value={data.companyMail}
                        onChange={changeSave}
                        
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        id="emailAddress"
                        name='companyWebsite'
                        value={data.companyWebsite}
                        onChange={changeSave}
                       
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        id="address"
                        name='address'
                        value={data.address}
                        onChange={changeSave}
                       
                      />
                    </div>
                  </div>

                 
               </div>
                  
              <div className='tesisbilgisi basis-1/2'>
              <div className="border-b w-125 border-stroke  mt-7 py-4  dark:border-strokedark">
                {/* <h3 className="font-bold text-black dark:text-white">
                  TESİS BİLGİLERİ
                </h3> */}
              </div>
                  {/* <div className="mb-5.5">
                    <label
                      className="my-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Üretim / Faliyet Alanı
                    </label>
                      <div className="w-full sm:w-1/2 mb-5.5">
                  
                    <div className="relative">
                      <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        onChange={changeSave}
                        className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="productArea"
                        id="emailAddress"
                        value={data.productArea}
                       
                      />
                    </div>
                  </div>
                  </div> */}
                  <div className="w-full sm:w-1/2 mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white mt-2"
                      htmlFor="emailAddress"
                    >
                      Kapalı Alan
                    </label>
                    <div className="relative">
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        name="closeArea"
                        id="emailAddress"
                        value={data?.closeArea ? data?.closeArea : localFacilityDetail.totalArea}
                        onChange={changeSave}

                       
                        
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        name="openArea"
                        id="emailAddress"
                        value={data.openArea}
                        onChange={changeSave}
                       
                        
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
                      <input
                      className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                        name="workerCount"
                        id="emailAddress"
                        value={data?.workerCount ? data?.workerCount : localFacilityDetail.employeecount}
                        onChange={changeSave}
                      
                        
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
                      {/* <span className="absolute left-4.5 top-2">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span> */}
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
            {checkInput ?   <div className="flex justify-end gap-4.5 p-4">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      İptal
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Kaydet
                    </button>
                  </div> : null}
                  {/* BUTTON */}
            </div>
            </form>
          </div>
          {/* <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Your Photo
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                    <img src={userThree} alt="User" />
                  </div>
                  <div>
                    <span className="mb-1.5 text-black dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-2.5">
                      <button className="text-sm hover:text-primary">
                        Delete
                      </button>
                      <button className="text-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>

  );
};

export default Settings;
