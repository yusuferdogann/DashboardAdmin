import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useTranslation } from "react-i18next";


const index = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Breadcrumb pageName={t("breadcrumb.settings")} />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-7.5'>
        <NavLink to='/facility-information'>
          <div className=" flex flex-col items-center bg-white cursor-pointer h-[100px] duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 " >
            <i style={{ fontSize: '50px' }} className="fa-solid fa-industry px-3"></i>
            <h1>{t("settings.facility")} </h1>
          </div>
        </NavLink>
        <NavLink to='/view/language-settings'>
          <div className=" flex flex-col items-center bg-white cursor-pointer h-[100px] duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 " >
            <i style={{ fontSize: '50px' }} className="fa-solid fa-language px-3"></i>
           
            <h1>{t("settings.language")}</h1>
          </div>
        </NavLink>
      </div>
    </>
  )
}

export default index