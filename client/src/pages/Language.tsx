import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import { useTranslation } from "react-i18next";
import "../../src/i18n.js";
import { useEffect } from "react";

const Language = () => {

    const { t, i18n } = useTranslation();

    useEffect(() => {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }, [i18n]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
      };
  return (
    <>
    <Breadcrumb pageName={t("breadcrumb.language")} />
    <div>
     
      {/* <label className="block">Select Language: </label> */}
      <select className='w-full rounded border mt-5 border-stroke  py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary' onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
    </>
  )
}

export default Language