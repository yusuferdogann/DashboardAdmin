import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import Facility from "../Facility/index"
import Dropdown from "../../common/Dropdown/index"
import DataPicker from "../../common/DataPicker/index"
import Input from "../../common/Input/index"
import { useState } from "react";

const Icon = ({ id, open }) => {
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

const AccordionCustomIcon = () => {


  const Countries = [
    {
      id: 1,
      name: "Scope-1",
      states: [
        {
          name: "Stationary Combustion",
          cities: ["Dogalgaz", "Komur", "LPG"],
          units:['kg','ton','lt']
        },
        {
            name: "Mobile Combustion",
            cities: ["scope-1", "gg", "vv"],
            units:['scope-1','ton','lt']
          },
          {
            name: "Emision Combustion",
            cities: ["Dogalgaz", "Komur", "LPG"],
            units:['kg','ton','lt']
          },
          {
            name: "Stationary Combustion",
            cities: ["Dogalgaz", "Komur", "LPG"],
            units:['kg','ton','lt']
          },
      ],
    },
    {
      id: 2,
      name: "Scope-2",
      states: [
        {
          name: "3S",
          cities: ["Dogalgaz", "Komur", "LPG22"],
          units:['kg','ton','lt']
        },
        {
            name: "3M",
            cities: ["Dogalgaz", "Komur", "LPG22"],
            units:['kg','ton','lt']
          },
          {
            name: "3E",
            cities: ["Dogalgaz", "Komur", "LPG22"],
            units:['kg','ton','lt']
          },
          {
            name: "3SS",
            cities: ["scope-2", "Komur", "LPG22"],
            units:['scope-2','ton','lt']
          },
      ],
    },
    {
      id: 3,
      name: "Scope-3",
      states: [
        {
          name: "Stationary",
          cities: ["Dogalgaz", "Komur", "LPG33"],
          units:['kg','ton','lt']
        },
        {
            name: "Mobile",
            cities: ["Dogalgaz", "Komur", "LPG33"],
            units:['kg','ton','lt']
          },
          {
            name: "Emision",
            cities: ["Dogalgaz", "Komur", "LPG33"],
            units:['kg','ton','lt']
          },
          {
            name: "Stationary33",
            cities: ["scope-3", "Komur", "LPG33"],
            units:['scope-3','ton','lt']
          },
      ],
    },
  ];


  const [units, setUnits] = useState([]);
  const [country, setCountry] = useState([]);
  const [state,setState] = useState([])
  const [citiy,setCitiy] = useState()
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([]);
  const [open,setOpen] = useState();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    
    if (event.target.value==='Scope-1') {
      handleOpen(1)
      setStates(Countries.find((ctr) => ctr.name === "Scope-1").states);
    }
    else if(event.target.value==='Scope-2'){
      handleOpen(2)
      setStates(Countries.find((ctr) => ctr.name === "Scope-2").states);

    }
    else if(event.target.value==='Scope-3'){
      handleOpen(3)
      setStates(Countries.find((ctr) => ctr.name === "Scope-3").states);

    }
   
  };
  const changeState=(event)=>{
    setCities(states.find((state) => state.name === event.target.textContent).cities);
    setUnits(states.find((state) => state.name === event.target.textContent).units);


  }


  return (
  


<div >
<Facility />
<div className='border border-slate-300 rounded-2xl  p-5 '>
  <div className='grid grid-cols-3 gap-4'>
    <div className=" border border-slate-300 rounded-2xl bg-neutral-200">
    <div className="px-4">
      <div className="flex flex-col my-4">
        <span>Step 1</span>
        <span>SCOPE & SUBCATEGORY SELECTION</span>
      </div>
      <hr />
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={changeCountry} value='Scope-1'>SCOPE-1</AccordionHeader>
        <AccordionBody className='px-3' value={state}>
          {
            <div
              className="form-control"
              value={state}
              multiple={false}
            >
              <option>Select souttrce</option>
              {states.map((state, index) => (
                <button onClick={changeState}  key={index}  className="my-3 bg-sky-300 p-2 rounded-md">{state.name}</button>
              ))}
            </div>
          }
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={changeCountry} value='Scope-2'>
          SCOPE-2
        </AccordionHeader>
        <AccordionBody>
        {
            <div
              className="form-control"
              value={state}
              multiple={false}
            >
              <option>Select souttrce</option>
              {states.map((state, index) => (
                <button onClick={changeState}  key={index}  className="my-3 bg-sky-300 p-2 rounded-md">{state.name}</button>
              ))}
            </div>
          }
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={changeCountry} value='Scope-3'>
          SCOPE-3
        </AccordionHeader>
        <AccordionBody>
        {
            <div
              className="form-control"
              value={state}
              multiple={false}
            >
              <option>Select souttrce</option>
              {states.map((state, index) => (
                <button onClick={changeState}  key={index}  className="my-3 bg-sky-300 p-2 rounded-md">{state.name}</button>
              ))}
            </div>
          }
        </AccordionBody>
      </Accordion>


     
    </div>
    </div>
    <div className="col-span-2 bg-neutral-200 rounded-2xl border-slate-300 border">
    <div className='p-3'>
      <div className='flex flex-col'>
      <span>Step 2 </span>
      <span>EMISSIN SOURCE SELECTION:<span>SCOPE 1/STATIONARY COMBUSTION</span></span>
      </div>
      <hr  className='my-4'/>
      <div className='grid grid-cols-2'>
      <DataPicker/>
      </div>
      <div className='grid grid-cols-3 gap-3 my-5'>
      <div className="block w-full">
      <label  className="block mb-2 text-sm font-medium text-gray-600 w-full">Emission Source</label>
      <select value={citiy} id="countries" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none" >
     
      {cities?.map((citiy,index) => (
          <option  key={index}>{citiy}</option>
      ))}
     
      
      </select>
      </div>
      <div className="block w-full">
      <label  className="block mb-2 text-sm font-medium text-gray-600 w-full">Units</label>
      <select value={citiy} id="countries" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none" >
     
      {units?.map((citiy,index) => (
          <option  key={index}>{citiy}</option>
      ))}
     
      
      </select>
      </div>
    <Input/>
      </div>
      <hr className='mt-3'/>
    <div className='flex justify-end mt-4'>
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>

    </div>
    </div>
    </div>
  </div>
</div>
</div>
  );
}
export default AccordionCustomIcon




