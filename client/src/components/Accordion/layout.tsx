import React, { useState } from 'react'
import Facility from "../Facility/index"
import Accordion from "./index"
import Calculation from '../../pages/Calculation/index'
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
  const [open, setOpen] = React.useState(0);
  const [data, setData] = useState(Countries);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([])
  const [citiy, setCitiy] = useState()
  const [cities, setCities] = useState([])
  const [states, setStates] = useState<Array<String>>([]);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === event.target.value).states);
    // setData(states)
  };
  const changeState = (event) => {
    setCities(states.find((state) => state.name === event.target.value).cities);

  }


  return (

    <div >
      <Facility />
      <div className='border border-slate-300 rounded-2xl  p-5 '>
        <div className='grid grid-cols-3 gap-4'>
          <div className=" border border-slate-300 rounded-2xl bg-neutral-200"><Accordion changeCountry={changeCountry} country={country} data={data}/></div>
          <div className="col-span-2 bg-neutral-200 rounded-2xl border-slate-300 border"><Calculation changeState={changeState} state={state} states={states}/></div>
        </div>
      </div>
    </div>
  )
}

export default layout