import { useState } from 'react';
import ClickOutside from '../components/ClickOutside';



const Facilitynote = (props:any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [facilitycheck,setFacilitycheck] = useState(false)

  const Tiklandi = () =>{
    setFacilitycheck(true)
    props.onClick(true)
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative duration-300 ease-in-out">
      <li style={{listStyle:'none',zIndex:'99',position:'relative'}}>
        <div
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
       
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          

        <i className="fa-solid fa-gear"></i>

        </div>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-30 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
           

            <ul className=" h-auto  overflow-y-auto pt-3">
              <li  
              onClick={Tiklandi} 
              className="flex flex-col gap-2.5  border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-black">
                <div className='flex justify-between '>
                <div><h5>Düzenle</h5></div>
                <div><i className="fa-solid fa-pen-to-square"></i></div>
                </div>
              </li>
              <li className="flex flex-col gap-2.5  border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-black">
              <div className='flex justify-between '>
                <div><h5>Sil</h5></div>
                <div><i className="fa-solid fa-trash"></i></div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default Facilitynote;
