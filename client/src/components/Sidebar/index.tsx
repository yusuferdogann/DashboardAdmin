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
      className={`absolute left-0 top-0 z-0 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between relative logoblock " style={{ width: "240px", margin: '1.5rem', borderRadius: '20px', border: object?.company_logo ? "" : '2px  white', height: "140px" }}>



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
          <div className='relative 2xsm:mt-[11rem] xsm:mt-0' style={{ borderRadius: "20px", height: "142px", zIndex: '234' }}>
            <img className='z-99' style={{ borderRadius: "20px", height: "142px", zIndex: '234', width: "250px", position: 'relative' }} src={object?.company_logo} alt="" />
            {
              object?.facilityname === undefined ? <div></div> :
                <div className='absolute top-0' >
                  <Tooltip content="Logo Ekleyin" placement="right" style={{ color: "red", zIndex: "0", background: 'red' }}>
                    <button className='flex justify-center items-center relative z-[99999]' style={{ height: '140px', width: '238px', borderRadius: '20px', background: '#ff000000' }}>{object?.company_logo ? '' : <span style={{ color: "white", fontSize: '35px' }}>+</span>}</button>
                  </Tooltip>
                </div>
            }
          </div>
        </div>

        {/* object?.facilityname !== null & location.pathname === '/facility' */}

        {/* <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          // className="block lg:hidden"
          className="block"

        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button> */}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6 2xsm:mt-[5rem]">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <div className="border-b border-stroke py-1 mb-4  dark:border-strokedark"></div>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/dashboard' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <li className="relative group">
                        {userRole !== "admin" && userRole !== "professional" ? (
                          // Kullanıcı 'user' ise
                          <Tooltip content="Paketi yükseltin" placement="right" className="z-[1001]">
                            <div className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                              <div className="flex items-center pointer-events-none">
                                <svg
                                  className="fill-current"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                                    fill=""
                                  />
                                  <path
                                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                                    fill=""
                                  />
                                  <path
                                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                                    fill=""
                                  />
                                  <path
                                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                                    fill=""
                                  />
                                </svg>
                                <span className="relative flex items-center ms-2">
                                {t("sidebar.dashboard")}
                                  {/* PRO Etiketi - Sadece 'user' için gösterilir */}
                                  <span
                                    className="ml-1 text-[10px] font-bold bg-clip-text text-transparent"
                                    style={{
                                      backgroundImage: "linear-gradient(to right, #00ff8e, #00a0fe)"
                                    }}
                                  >
                                    PRO
                                  </span>
                                </span>
                              </div>
                            </div>
                          </Tooltip>
                        ) : (
                          // Kullanıcı 'admin' ise (Tıklanabilir ve PRO etiketi yok)
                          <NavLink
                            to="/dashboard"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') && 'bg-graydark dark:bg-meta-4'
                            }`}                          
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                                fill=""
                              />
                              <path
                                d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                                fill=""
                              />
                              <path
                                d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                                fill=""
                              />
                              <path
                                d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                                fill=""
                              />
                            </svg>
                            <span className="relative flex items-center">{t("sidebar.dashboard")}</span>
                          </NavLink>
                        )}
                      </li>
                     
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              
              <li className="relative group">
                {userRole !== "admin" && userRole !== "professional" ? (
                  // Kullanıcı 'user' ise
                  <Tooltip content="Paketi yükseltin" placement="right" className="z-[1001]">
                    <div className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                      <div className="flex items-center pointer-events-none">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                            fill=""
                          />
                        </svg>                       
                         <span className="relative flex items-center ms-2">
                         {t("sidebar.calculation")}
                          {/* PRO Etiketi - Sadece 'user' için gösterilir */}
                          <span
                            className="ml-1 text-[10px] font-bold bg-clip-text text-transparent"
                            style={{
                              backgroundImage: "linear-gradient(to right, #00ff8e, #00a0fe)"
                            }}
                          >
                            PRO
                          </span>
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                ) : (
                  // Kullanıcı 'admin' ise (Tıklanabilir ve PRO etiketi yok)
                  <NavLink
                    to="/calculation"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calculation') && 'bg-graydark dark:bg-meta-4'
                    }`}                  
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                        fill=""
                      />
                    </svg>                   
                    <span className="relative flex items-center">{t("sidebar.calculation")}</span>
                  </NavLink>
                )}
              </li>
            
             
             
              

              <NavLink
                  to="/facility"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('facility') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                    
                    <i style={{ color: '#b5bbc7' }} className="fa-solid fa-industry"></i>
    
                    {t("sidebar.facility")}
                </NavLink>


              <li className="relative group">
                {userRole !== "admin" && userRole !== "professional" ? (
                  // Kullanıcı 'user' ise
                  <Tooltip content="Paketi yükseltin" placement="right" className="z-[1001]">
                    <div className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                      <div className="flex items-center pointer-events-none">
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9801)">
                            <path
                              d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                              fill=""
                            />
                            <path
                              d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9801">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="relative flex items-center ms-2">
                        {t("sidebar.report")}
                          {/* PRO Etiketi - Sadece 'user' için gösterilir */}
                          <span
                            className="ml-1 text-[10px] font-bold bg-clip-text text-transparent"
                            style={{
                              backgroundImage: "linear-gradient(to right, #00ff8e, #00a0fe)"
                            }}
                          >
                            PRO
                          </span>
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                ) : (
                  // Kullanıcı 'admin' ise (Tıklanabilir ve PRO etiketi yok)
                  <NavLink
                    to="/chart"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                    }`}                 
                 >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_130_9801)">
                        <path
                          d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                          fill=""
                        />
                        <path
                          d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_130_9801">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.052124)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="relative flex items-center"> {t("sidebar.analysis")}</span>
                  </NavLink>
                )}
              </li>

              <li>
                <NavLink
                  to="/get-report"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('get-report') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <i className="fa-regular fa-file" style={{ color: '#b5bbc7' }}></i>
                  {t("sidebar.report")}
                </NavLink>
              </li>

              {/* <li className="relative group">
                {userRole !== "admin" && userRole !== "professional" ? (
                  <Tooltip content="Paketi yükseltin" placement="right" className="z-[1001]">
                    <div className="relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                      <div className="flex items-center pointer-events-none">
                        <i className="fa-solid fa-desktop"></i>
                        <span className="relative flex items-center ms-2">
                        {t("sidebar.sumary")}
                          <span
                            className="ml-1 text-[10px] font-bold bg-clip-text text-transparent"
                            style={{
                              backgroundImage: "linear-gradient(to right, #00ff8e, #00a0fe)"
                            }}
                          >
                            PRO
                          </span>
                        </span>
                      </div>
                    </div>
                  </Tooltip>
                ) : (
                  <NavLink
                    to="/sumary"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('sumary') && 'bg-graydark dark:bg-meta-4'
                    }`}                 
                 >
                    <i className="fa-solid fa-desktop"></i>
                    <span className="relative flex items-center"> {t("sidebar.sumary")}</span>
                  </NavLink>
                )}
              </li> */}
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          <div>
          

            <ul className="mb-6 flex flex-col gap-1.5">
              
              
      
            </ul>
          </div>
          <NavLink
            target="_blank"
            to="https://carbonistan.com/"
            style={{ position: 'absolute',bottom:"0" }}
            className={`2xsm:bottom-0 xsm:bottom-[3rem] logotext group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
              }`}
          >
            <img src={LogoCarbon} style={{ width: '20px' }} alt="Logo" />
            CARBONİSTAN
          </NavLink>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
