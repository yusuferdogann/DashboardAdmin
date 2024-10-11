import React from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'

const Facility = () => {
    return (

      <>
         <Breadcrumb pageName="Tesisler" />

<div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>

    <div>
{/* group relative flex items-center gap-2.5 rounded-sm
py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out
hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4 active */}
        <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
            <i style={{ fontSize: '50px' }} class="fa-solid fa-industry px-3"></i>
            <div className="flex flex-col justify-between p-4 w-100 leading-normal">
                <div className='flex justify-between  items-center'>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - İSTANBUL SUBE</h5>
                <i class="fa-solid fa-gear"></i>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Çalışan Sayısı:</span></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Toplam Kapali Alan:</span></p>

            </div>
        </a>
    </div>

    <div>
    <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
            <i style={{ fontSize: '50px' }} class="fa-solid fa-industry px-3"></i>
            <div className="flex flex-col justify-between p-4 w-100 leading-normal">
                <div className='flex justify-between  items-center'>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - KONYA SUBE</h5>
                <i class="fa-solid fa-gear"></i>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Çalışan Sayısı:</span></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Toplam Kapali Alan:</span></p>

            </div>
        </a>
    </div>
    <div>
    <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
            <i style={{ fontSize: '50px' }} class="fa-solid fa-industry px-3"></i>
            <div className="flex flex-col justify-between p-4 w-100 leading-normal">
                <div className='flex justify-between  items-center'>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - ANKARA SUBE</h5>
                <i class="fa-solid fa-gear"></i>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Çalışan Sayısı:</span></p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-normal'>Toplam Kapali Alan:</span></p>

            </div>
        </a>
    </div>

</div>
      </>
    )
}

export default Facility