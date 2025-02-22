import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
// import AccordionLayout from "./components/Accordion/layout"
import AccordionLayout from "./components/Accordion/index"
import Sumary from './pages/Sumary';
import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';
import { userAuth } from './auth/userAuth';
import Facility from './pages/Facility';
import Reports from './pages/Report/Reports';
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode
import View from "./pages/View"
import Language from "./pages/Language"
import ProtectedRoute from "./ProtectRoute";
import axios from 'axios';
import api from "./server/Apiendpoint"; // Az önce oluşturduğumuz axiosConfig dosyasını import et


function App() {
  const { token, checkSpinner } = userAuth()
  
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    // Global event listener ile oturum süresi dolduğunda modalı aç
    const handleSessionExpired = () => setIsSessionExpired(true);

    window.addEventListener("sessionExpired", handleSessionExpired);
    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  const checkRole = JSON.parse(localStorage.getItem('detail'))
  const Role = checkRole?.role
// Örnek: Kullanıcının giriş yaptığı rolü belirleme
const userRole = Role; // Bunu gerçek token veya context'ten çekebilirsin

const handleModalClose = () =>{

  setTimeout(() => {
    setIsSessionExpired(false);
    window.location.href = "/login";
    window.localStorage.clear();



  }, 2000);
  
}



  return (
    <>
       {checkSpinner ? (
        token ? (
          // Normal yükleme spinner'ı
          <div
            role="status"
            className="grid place-items-center w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm"
            style={{
              opacity: "1",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "9999",
            }}
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : null
      ) : null}

      {/* Oturum süresi dolduğunda açılan modal */}
      {/* {isSessionExpired && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          style={{ zIndex: "9999" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Oturum Süreniz Doldu</h2>
            <p className="text-gray-600 mb-4">Lütfen tekrar giriş yapın.</p>
            <button
              onClick={() => handleModalClose()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Kapat
            </button>
          </div>
        </div>
      )} */}
      {
        (!token) ?

          <Routes>

            <Route
              path="/register"
              element={
                <>
                  <PageTitle title="Kayıt Ol " />
                  <Register />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <PageTitle title="Giriş Yap " />
                  <Login />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <PageTitle title="Giriş Yap " />
                  <Login />
                </>
              }
            />

          </Routes>
          :
          <DefaultLayout>
            <Routes>
             
            <Route
          path="/dashboard"
          element={<ProtectedRoute element={<ECommerce />} allowedRoles={["admin", "professional"]} userRole={userRole} />}
        />
              <Route
                path="/register"
                element={
                  <>
                    <PageTitle title="Register " />
                    <Register />
                  </>
                }
              />
              <Route
                path="/facility"
                element={
                  <>
                    <PageTitle title="Tesisler " />
                    <Facility />
                  </>
                }
              />
              <Route
                path="/get-report"
                element={
                  <>
                    <PageTitle title="Roparlar " />
                    <Reports />
                  </>
                }
              />

              <Route
                path="/calendar"
                element={
                  <>
                    <PageTitle title="Calendar " />
                    <Calendar />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile " />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements " />
                    <FormElements />
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout " />
                    <FormLayout />
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables " />
                    <Tables />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings " />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart " />
                    <Chart />
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts " />
                    <Alerts />
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons " />
                    <Buttons />
                  </>
                }
              />
             
                 <Route
          path="/calculation"
          element={<ProtectedRoute element={<AccordionLayout />} allowedRoles={["admin", "professional"]} userRole={userRole} />}
              />
                <Route
          path="/sumary"
          element={<ProtectedRoute element={<Sumary />} allowedRoles={["admin", "professional"]} userRole={userRole} />}
              />
              <Route
                path="/view"
                element={
                  <>
                    <PageTitle title="View " />
                    <View />
                  </>
                }
              />
               <Route
                path="/view/language-settings"
                element={
                  <>
                    <PageTitle title="Language " />
                    <Language />
                  </>
                }
              />
            </Routes>
  {/* Oturum süresi dolduğunda açılan modal */}
  {isSessionExpired && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          style={{ zIndex: "9999" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">Oturum Süreniz Doldu</h2>
            <p className="text-gray-600 mb-4">Lütfen tekrar giriş yapın.</p>
            <button
              onClick={() => { handleModalClose()}}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Oturum Aç
            </button>
          </div>
        </div>
      )}
          </DefaultLayout>
      }
    </>

  )
}

export default App;
