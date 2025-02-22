import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/new-logo-new.png';
import { Tooltip, Button } from "@material-tailwind/react";
import zIndex from '@mui/material/styles/zIndex';
import Image from "../../images/logo/sidebarlogodd.jpg"
import { userAuth } from '../../auth/userAuth';
import Report from "../../images/logo/report.png"
import { post, get } from '../../server/Apiendpoint';
import LogoCarbon from "../../images/logo/logorevize.png"
import { useTranslation } from "react-i18next";
import { FaHome, FaCalculator, FaBuilding, FaChartBar, FaFileAlt, FaClipboardList } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const { value, token, user } = userAuth();
  const { t } = useTranslation(); // i18n çeviri fonksiyonunu çağır

  // console.log("VALUEEE",value)
  const [updatelogo, setUpdateLogo] = useState(false)
  const fileUploadRef = useRef();
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const [avatarURL, setAvatarURL] = useState('')
  const [image, setImage] = useState("")
  const [comeImage, setComeImage] = useState()
  const [tesisName, setTesisName] = useState()

    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
  
  
    const menuItems = [
      { name: "Ana Sayfa", path: "/", icon: <FaHome />, roles: ["admin", "guest"] },
      { name: "Hesaplama", path: "/calculation", icon: <FaCalculator />, roles: ["admin"] },
      { name: "Tesisler", path: "/facility", icon: <FaBuilding />, roles: ["admin","demo",] },
      { name: "Analiz", path: "/analysis", icon: <FaChartBar />, roles: ["admin"] },
      { name: "Rapor Al", path: "/get-report", icon: <FaFileAlt />, roles: ["admin","demo",] },
      { name: "Özet", path: "/sumary", icon: <FaClipboardList />, roles: ["admin",  "guest"], showPro: true },
    ];
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  var val = localStorage.getItem('facilityInformation');
  var object = JSON.parse(val);
  var userDetail = JSON.parse(localStorage.getItem("detail"))
  // console.log("ROLE------------",userDetail?.role)
  // setTesisName(object.tesisName)
  // console.log("data-----------------",object.company_logo)
  // console.log("right-------",object?.facilityname)
  // close if the esc key is pressed

  // Kullanıcının rolünü belirle (Bu değeri backend'den alabilirsin)
  const userRole = userDetail?.role; // "user" veya "admin" olarak değiştir
  useEffect(() => {

    const fetchdata = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + token
        }
      };
      const dataResult = await get('/getlogo', config);
      console.log("DATA-IMAGE-----------", dataResult)
      setComeImage(dataResult)
    }

    fetchdata();


    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [updatelogo]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);



  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const uploadImageDisplay = () => {
    const uploadFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadFile);
    setAvatarURL(cachedURL)
  }
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      // console.log(reader.result)
      setImage(reader.result)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + token
        }
      };
      const dataResult = await post('/uploadimage', ({ base64: reader.result }), config);
      console.log("DATA-IMAGE-----------", dataResult)
      setUpdateLogo(true)
      console.log("deneme geliyor-------------", comeImage)
      let loggedInUser = JSON.parse(localStorage.getItem('facilityInformation'));
      loggedInUser.company_logo = reader.result;
      localStorage.setItem('facilityInformation', JSON.stringify(loggedInUser));
    }
    reader.onerror = error => {
      console.log("error", error)
    }
  }

  return (
    <aside
      style={{ zIndex: '999' }}
      ref={sidebar}
      className={`relative h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen || isPinned ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => !isPinned && setIsOpen(true)}
      onMouseLeave={() => !isPinned && setIsOpen(false)}
      
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between relative logoblock " style={{ width: "200px", margin: '1.5rem', borderRadius: '20px', border: object?.company_logo ? "" : '2px  white', height: "120px" }}>



        <div>
          <form id='form' encType='multipart/form-data' action="">
            {
              object?.facilityname === undefined ? <div></div> :
                <div className='absolute 2xsm:top-[5rem] xsm:mt-0 top-0 right-0 z-999  text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-white bg-[#d3d3d3] dark:bg-meta-4 logohover' style={{ padding: "10px", borderRadius: '50%', margin: ".75rem" }}>
                  <button type='submit' onClick={handleImageUpload}> <i style={{ fontSize: '35x', color: "black" }} className="fa-regular fa-image"></i></button>
                </div>
            }
            <input type="file" id='file' ref={fileUploadRef} onChange={(e) => convertToBase64(e)} hidden />
          </form>
          <div   className={`relative h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen || isPinned ? "relative 2xsm:mt-[11rem] xsm:mt-0" : "hidden"}`} style={{ borderRadius: "20px", height: "130px", zIndex: '234' }}>
            <img className='z-99' style={{ borderRadius: "px", height: "130px", zIndex: '234', width: "200px", position: 'relative' }} src={object?.company_logo} alt="" />
            {
              object?.facilityname === undefined ? <div></div> :
                <div className='absolute top-0' >
                  <Tooltip content="Logo Ekleyin" placement="right" style={{ color: "red", zIndex: "0", background: 'red' }}>
                    <button className='flex justify-center items-center relative z-[99999]' style={{ height: '130px', width: '200px', borderRadius: '7px', background: '#ff000000' }}>{object?.company_logo ? '' : <span style={{ color: "white", fontSize: '35px' }}>+</span>}</button>
                  </Tooltip>
                </div>
            }
          </div>
        </div>

        
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div
     
    >
      {/* Sabitleme Butonu */}
      <button
        className="absolute right-2 top-4 text-white"
        onClick={() => setIsPinned(!isPinned)}
      >
        {isPinned ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Menü Listesi */}
      <ul className="mt-12">
        {menuItems.map((item, index) => {
          if (!item.roles.includes(userRole)) return null;

          return (
            <li key={index} className="relative group">
              {item.showPro && userRole !== "admin" && userRole !== "professional" ? (
                <Tooltip content="Paketi yükseltin" placement="right" className="z-[1001]">
                  <div className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-700">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`transition-all ${isOpen || isPinned ? "opacity-100" : "opacity-0 w-0"}`}>
                      {item.name}
                    </span>
                    {/* PRO Etiketi */}
                    <span
                      className={`ml-1 text-[10px] font-bold bg-clip-text text-transparent ${isOpen || isPinned ? "opacity-100" : "opacity-0 w-0"}`}
                      style={{
                        backgroundImage: "linear-gradient(to right, #00ff8e, #00a0fe)",
                      }}
                    >
                      PRO
                    </span>
                  </div>
                </Tooltip>
              ) : (
                <NavLink
                  to={item.path}
                  className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-700"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className={`transition-all ${isOpen || isPinned ? "opacity-100" : "opacity-0 w-0"}`}>
                    {item.name}
                  </span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
    </aside>
  );
};

export default Sidebar;
