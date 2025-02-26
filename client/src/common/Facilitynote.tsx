import { useEffect, useState } from 'react';
import ClickOutside from '../components/ClickOutside';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { post } from '../server/Apiendpoint';
import { userAuth } from "../auth/userAuth";
import { toast } from 'react-toastify';

const Facilitynote = (props: any) => {
  const { token } = userAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [size, setSize] = useState(null);
  const [idDeletedFacility, setIdDeletedFacility] = useState();
  const [facilityName, setFacilityName] = useState(props.deleteData?.facilityname); // Düzenlemede kullanılacak tesis adı
  const [data, setData] = useState();
  const [nameDeletedFacility, setNameDeletedFacility] = useState(props.deleteData?._id);

  useEffect(() => {
    setIdDeletedFacility(props.deleteData?._id);
  }, [props.deleteData]);

  const handleOpen = (value) => setSize(value);

  // Edit işlemi
  const EditFacility = (event) => {
    if (props.deleteData._id === nameDeletedFacility) {
      props.onClick(props.deleteData);
    }
  };

  const deleteFacility = () => {
    setData(props.deleteData._id);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token
      }
    };

    const fetchData = async () => {
      try {
        const dataResult = await post('/deletefacility', { idDeletedFacility }, config);

        // Başarıyla silme işlemi yapıldıysa
        toast.success('Tesis başarıyla silindi!');

        // Silinen facility'yi listeden çıkar
        props.setResultData((state) => state.filter((item) => item._id !== props.deleteData._id));

        handleOpen(null);
      } catch (error) {
        // Eğer bir hata oluşursa
        toast.error('Silme işlemi sırasında bir sorun oluştu!');
        console.error('Silme işlemi hatası: ', error);
      }
    };
    fetchData();
  };


  // Input değeri değiştiğinde güncelle
  const handleInputChange = (event) => {
    setFacilityName(event.target.value);
  };

  // "Düzenle" tıklandığında tesisi kaydetme
  const saveChanges = () => {
    // Yeni değer API'ye gönderilmeli
    // Bu kısmı kendi API'nize göre güncelleyin
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token
      }
    };
    const fetchData = async () => {
      const dataResult = await post('/updatefacility', { id: props.deleteData._id, facilityname: facilityName }, config);
      console.log("Güncellenmiş tesis:", dataResult);
      props.setResultData((state) =>
        state.map((item) =>
          item._id === props.deleteData._id ? { ...item, facilityname: facilityName } : item
        )
      );
      handleOpen(null);
    };
    fetchData();
  };

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative duration-300 ease-in-out">
        <li style={{ listStyle: 'none', zIndex: '99', position: 'relative' }}>
          <div
            onClick={() => {
              setNotifying(false);
              setDropdownOpen(!dropdownOpen);
              setIdDeletedFacility(props.deleteData._id);
            }}
            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
          >
            <i className="fa-solid fa-gear"></i>
          </div>
          {dropdownOpen && (
            <div
              className="absolute -right-27 mt-2.5 flex h-30 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80"
            >
              <ul className="h-auto overflow-y-auto pt-3">
                <li
                  onClick={EditFacility}
                  className="flex flex-col gap-2.5 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-black"
                >
                  <div className="flex justify-between">
                    <div><h5>Düzenle</h5></div>
                    <div><i className="fa-solid fa-pen-to-square"></i></div>
                  </div>
                </li>
                <li
                  onClick={() => handleOpen('xs')}
                  className="flex flex-col gap-2.5 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 text-black"
                >
                  <div className="flex justify-between">
                    <div><h5>Sil</h5></div>
                    <div><i className="fa-solid fa-trash"></i></div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ClickOutside>

      {/* Silme Onayı */}
      <Dialog
        open={size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl" || size === "xxl"}
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogHeader className="text-center mx-auto relative">Tesisi Sil</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1">
            <div className="flex flex-col items-center bg-white mx-auto w-full border-gray-200 md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 mb-5 text-center">
              <span className="text-black font-bold text-red me-3">{props.deleteData.facilityname}</span>{" "}
              <p className="text-normal">tesisini silmek istediğinizden emin misiniz?</p><br />
            </div>
            <span className="mt-5 text-red-300">NOT: Tesis ile birlikte tesise ait bütün kapsam bilgileri de silinecektir.</span>
          </div>
        </DialogBody>
        <DialogFooter>
          <span className="text-black">{props.deletedData?.facilityname}</span>
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>İptal Et</span>
          </Button>
          <Button variant="gradient" color="green" onClick={deleteFacility}
            className="flex items-center  gap-2 px-4 py-2 text-white rounded shadow-lg"
            style={{
              background: "linear-gradient(to right, rgb(0, 255, 142), rgb(0, 160, 254))",
            }}
          >
            <span>Sil</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Facilitynote;
