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


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = userAuth()
  const navigate = useNavigate()


 

  useEffect(() => {
    if (!token) {
      navigate("/login")
      
    }
  }, [token, navigate])

  return (
    <>
    {
      (!token) ?
      <Login/> :
            <DefaultLayout>
              <Routes>
                <Route
                  index
                  element={
                    <>
                      <PageTitle title="Dashboard " />
                      <Facility />
                    </>
                  }
                />
                 <Route
                  path='/dashboard'
                  element={
                    <>
                      <PageTitle title="Dashboard " />
                      <ECommerce />
                    </>
                  }
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
                  element={
                    <>
                      <PageTitle title="Calculation " />
                      <AccordionLayout />
                    </>
                  }
                />
                <Route
                  path="/sumary"
                  element={
                    <>
                      <PageTitle title="Sumary " />
                      <Sumary />
                    </>
                  }
                />
              </Routes>

            </DefaultLayout>
          
                } 
    </>

  )
}

export default App;
