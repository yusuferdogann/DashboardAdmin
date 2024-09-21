import React from 'react'

const Facility = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>

            <div>
                <a href="#" className="flex flex-col items-center bg-white  border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <i style={{ fontSize: '100px' }} class="fa-solid fa-industry px-3"></i>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <div className='flex justify-center w-[108] items-center'>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - ÇEKMEKÖY SUBE</h5>
                        <i class="fa-solid fa-gear"></i>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Çalışan Sayısı:</span></p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Toplam Kapali Alan:</span></p>

                    </div>
                </a>
            </div>

            <div>
                <a href="#" className="flex flex-col items-center bg-white  border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <i style={{ fontSize: '100px' }} class="fa-solid fa-industry px-3"></i>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - ŞİŞLİ SUBE</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Çalışan Sayısı:</span></p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Toplam Kapali Alan:</span></p>


                    </div>
                </a>
            </div>
            <div>
                <a href="#" className="flex flex-col items-center bg-white  border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <i style={{ fontSize: '100px' }} class="fa-solid fa-industry px-3"></i>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASELSAN - ANKARA SUBE</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Çalışan Sayısı:</span></p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='font-bold'>Toplam Kapali Alan:</span></p>


                    </div>
                </a>
            </div>

        </div>
    )
}

export default Facility