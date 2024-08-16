import React, { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";

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

const AccordionCustomIcon = ({changeCountry,country,data}) => {
  const [open,setOpen] = useState()
  const handleOpen = (val) => setOpen(open === val ? 0 : val);

  return (
    <div className="px-4">
      <div className="flex flex-col my-4">
        <span>Step 1</span>
        <span>SCOPE & SUBCATEGORY SELECTION</span>
      </div>
      <hr />
      <Accordion open={open === 1} icon={<Icon id={1} open={open} onChange={changeCountry} value={country} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>SCOPE-1</AccordionHeader>
        <AccordionBody className='px-3'>
          <select
            className="form-control"
            value={country}
            onChange={changeCountry}
            multiple={false}
          >
            <option>Select Scope</option>
            {data.map((ctr, index) => (
              <option key={index}>{ctr.name}</option>
            ))}
          </select>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open}  />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          SCOPE-2
        </AccordionHeader>
        <AccordionBody>
         
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open}  />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          SCOPE-3
        </AccordionHeader>
        <AccordionBody>
         
        </AccordionBody>
      </Accordion>
    </div>
  );
}
export default AccordionCustomIcon