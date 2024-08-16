import React, { useState } from "react";
import {Accordion,AccordionHeader,AccordionBody,} from "@material-tailwind/react";
 
const Icon=({ id, open })=> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
const AccordionCustomIcon=()=> {
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
  const [state,setState] = useState([])
  const [citiy,setCitiy] = useState()
  const [cities, setCities] = useState([])
  const [states, setStates] = useState<Array<String>>([]);
 
  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(Countries.find((ctr) => ctr.name === event.target.value).states);
    // setData(states)
  };
  const changeState=(event)=>{
    setCities(states.find((state) => state.name === event.target.value).cities);

  }
  console.log("MAIN",states)

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div className="px-4">
     <div className="flex flex-col my-4">
     <span>Step 1</span>
     <span>SCOPE & SUBCATEGORY SELECTION</span>
     </div>
      <hr />
      <Accordion open={open === 1} icon={<Icon id={1} open={open} onChange={changeCountry} value={country}/>}>
        <AccordionHeader onClick={() => handleOpen(1)}>SCOPE-1</AccordionHeader>
        <AccordionBody className='px-3'>
        <select
                className="form-control"
                value={country}
                onChange={changeCountry}
                multiple={false}
              >
               <option>Select Scope</option>
                {data.map((ctr,index) => (
                  <option  key={index}>{ctr.name}</option>
                ))}
              </select>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} onChange={changeState} value={state}/>}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          SCOPE-2
        </AccordionHeader>
        <AccordionBody>
        {states.map((state,index) => (
                  <button  key={index}>{state.name}</button>
                ))}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open}   onChange={changeState}  value={citiy}/>}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          SCOPE-3
        </AccordionHeader>
        <AccordionBody>
        {cities.map((citiy,index) => (
                  <button  key={index}>{citiy}</button>
                ))}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
export default AccordionCustomIcon