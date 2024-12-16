import React, { useState } from 'react'
import Facility from "../Facility/index"
import Accordion from "./index"
import Calculation from '../../pages/Calculation/index'
import Deneme from "./deneme"
const layout = () => {

  const Countries = [
    {
      id: 1,
      name: "Scope-1",
      states: [
        {
          name: "Stationary Combustion",
          cities: ["Dogalgaz", "Komur", "LPG"]
        },
        {
          name: "Mobile Combustion",
          cities: ["tt", "gg", "vv"]
        },
        {
          name: "Emision Combustion",
          cities: ["Dogalgaz", "Komur", "LPG"]
        },
        {
          name: "Stationary Combustion",
          cities: ["Dogalgaz", "Komur", "LPG"]
        },
      ],
    },
    {
      id: 2,
      name: "Scope-2",
      states: [
        {
          name: "Mobile Combustion Combustion",
          cities: ["Dogalgaz", "Komur", "LPG"]
        },
      ],
    },

  ];

  const Scopes = [
    {
    title:"Scope-1",
    state:['Stationary Combustion','Mobile Combustion','Fugiti Emissions','Process Emissions']
  },
  {
    title:"Scope-2",
    state:['2 - Stationary Combustion','Mobile Combustion','Fugiti Emissions','Process Emissions']
  }, 
  {
    title:"Scope-3",
    state:['3 - Stationary Combustion','Mobile Combustion','Fugiti Emissions','Process Emissions']
  }
  ]

  // const [open, setOpen] = React.useState(0);
  const [data, setData] = useState(Countries);
  const [veri,setVeri] = useState(Scopes);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [citiy, setCitiy] = useState()
  const [cities, setCities] = useState([])
  const [states, setStates] = useState<Array<String>>([]);
  const [open,setOpen] = useState();


  const [scope,setScope] = useState();
  const [gez,setGez] = useState();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const changeCountry = (event) => {
    handleOpen(1)
    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === event.target.value).states);
    // setData(states)
  };
  const changeScope = (event) => {
    setScope(event.target.value);
    setGez(Scopes.find((ctr) => ctr.name === event.target.value).gez);
    // setData(states)
  };


  const changeState = (event) => {
    setCities(states.find((state) => state.name === event.target.textContent).cities);

  }

  // const handleOpen = (value) => setOpen(open === value ? 0 : value);


  return (

    <div >
      <Facility />
      <div className='border border-slate-300   p-5 '>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
          <div className=" border border-slate-300 rounded-2xl bg-neutral-200"><Accordion changeCountry={changeCountry} changeState={changeState} citiy={citiy} open={open} cities={cities}  states={states}/></div>
          <div className="col-span-2 bg-neutral-200 rounded-2xl border-slate-300 border"><Calculation cities={cities} changeState={changeState} citiy={citiy}/></div>
          <Deneme/>

        </div>
      </div>
    </div>
  )
}

export default layout