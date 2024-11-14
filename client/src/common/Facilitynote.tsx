import { useEffect, useState } from 'react';
import ClickOutside from '../components/ClickOutside';
import { Tooltip, Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { post } from '../server/Apiendpoint';
import { userAuth } from "../auth/userAuth"
import axios from 'axios';



const Facilitynote = (props: any) => {
  const { token } = userAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [facilitycheck, setFacilitycheck] = useState(false)
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [nameDeletedFacility, setNameDeletedFacility] = useState('')
  const [idDeletedFacility, setIdDeletedFacility] = useState()
  const [data,setData] = useState()


  const Tiklandi = () => {
    setFacilitycheck(true)
    handleOpen('xs')

    // props.onClick(true)
  }
  const deleteFacility = () => {

    console.log("deleted-data------------", props.deleteData)
    setNameDeletedFacility(props.deleteData.facilityname)
    setIdDeletedFacility(props.deleteData._id)
    setData(props.deleteData._id)
    console.log('deleted-id----------------', data)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " +token
      }
    };

    const fetchData = async () => {
      props.setResultData((state) => state.filter((item) => item._id !== idDeletedFacility))
      const dataResult = await post('/deletefacility', {idDeletedFacility},config);

      console.log("deleted-dAta-------", dataResult)


    }
    fetchData()



  }

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative duration-300 ease-in-out">
        <li style={{ listStyle: 'none', zIndex: '99', position: 'relative' }}>
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
                <li
                  onClick={Tiklandi}

                  className="flex flex-col gap-2.5  border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-black">
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
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogHeader className='text-center relative' style={{ display: 'block' }}>Tesisi Sil</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1" >

            <div>

              <div className="flex flex-col items-center bg-white mx-auto w-full border-gray-200  md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 mb-5 text-center">
                <span className='text-black font-bold text-red me-3'>{nameDeletedFacility}</span> {" "} <p className='text-normal'>tesisini silmek istediginizden emin misiniz?</p><br />
              </div>
              <span className='mt-5 text-red-300'>NOT:Tesis ile birlikte tesise ait butun kapsamlarda silenecektir.</span>

            </div>


          </div>
        </DialogBody>
        <DialogFooter>
          <span className='text-black'>{props.deletedData?.facilityname}</span>

          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>İptal Et</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={deleteFacility}
          >
            <span>Sil</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Facilitynote;
