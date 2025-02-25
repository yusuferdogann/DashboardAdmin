import { useEffect, useState,useRef  } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { toast } from "react-toastify";  // React Toast kütüphanesini kullanıyoruz
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import Videokayit from '../../../src/images/video/animation-video.mp4'
import {CalculateFunction} from "../../common/utils/calculateFunction"
import { userAuth } from '../../auth/userAuth';
import { Country, State, City } from 'country-state-city';
import { get, post, put } from "../../server/Apiendpoint";


export default function Component() {
  const [open, setOpen] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectionType, setSelectionType] = useState(""); 
  const [selectedMonth, setSelectedMonth] = useState(""); 
  const [selectedPeriod, setSelectedPeriod] = useState(""); 
  const [selectedScope, setSelectedScope] = useState(null); 
  const [formErrors, setFormErrors] = useState({
    city: false,
    birim: false,
    amount: false,
    selection1: false,
    selection2: false,
    plaka:false,
    gasType:false,
    yakitturu:false
  });
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false); 
  const [selectedGasType, setSelectedGasType] = useState(""); 

  const [tableData, setTableData] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); // Düzenleme yapılacak satırın indexi
  const [editingAmount, setEditingAmount] = useState(""); // Düzenleme için gizli input
  const [showTabs, setShowTabs] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sahsi");
  // Modal için silme işlemi
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  // scope-3 kontrol 
  const [checkUp,setCheckUp] = useState(false)
  const [checkDown,setCheckDown] = useState(false)
  const [checkYakit,setCheckYakit] = useState(false)
  // input plaka
  const [checkPlaka, setCheckPlaka] = useState("");
  // video 
  const [videopen, setVideopen] = useState(false)
  //form temizleme
  const [formKey, setFormKey] = useState(Date.now());

  // tesis bilgileri
  const { setFacilitSend,facilitySend,token } = userAuth();
  const [cityName, setCityName] = useState([])

  // otomatik scroll yapi
  const targetRef = useRef(null);

  const handleScrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
   useEffect(()=>{
    const countryName = Country.getAllCountries();

        setCityName(countryName)
 const localData = JSON.parse(localStorage.getItem('facilityInformation'))
    setFacilitSend(localData)
   },[])
    const [sweet, setSweet] = useState('')
  
    // =========================================
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [dropcity, setDropCity] = useState(null);

// =======----------------------------------------------------------------------------------------------
  const facilityInfo = JSON.parse(localStorage.getItem("facilityInformation"));
  const datetime = new Date().toLocaleDateString("tr-TR");

  const [savedData, setSavedData] = useState({
    tarih: datetime,
    title: "",
    subtitle: "",
    // kaynak: "",
    birim: "",
    miktar: "",
    ulke: facilityInfo?.country,
    sehir: facilityInfo?.city,
    ilce: facilityInfo?.state,
    tesis: facilityInfo?.facilityname,
    situation: "",
    // gasType: "",
  });
  
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
    };
  
    const fetchData = async () => {
      try {
        const response = await get("/getdailyscope", config); 
        setTableData(response.data.data); // ⬅️ Backend'den gelen veriyi `tableData`'ya kaydet
        console.log("tableData güncellendi:", response.data.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const Countries = [
    {
      id: 1,
      name: "SCOPE-1",
      states: [
        {
          id: 1,
          name: "Sabit Yanma",
          short: ["sabit"],
          cities: ["Doğal Gaz", "Linyit Kömürü", "Yaş Biokütle"],
          birim: ["ton", "m3"]
        },
        {
          id: 2,
          name: "Hareketli Yanma",
          short: ["hareketli"],
          cities: ["Dizel Yakıt", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin"],
          birim: ["lt"]
        },
        {
          id: 3,
          name: "Doğrudan Sızma Kaçak Emisyon",
          short: ["dogrudan"],
          gastype: ["CO2", "R134a1", "R410a", "HFC32", "R601", "R601a"],
          cities: ["Su Sebili", "Buzdolabi", "Chiller", "Klima", "Yangın Söndürme Tüpü", "Endüstriyel Soğutucu"],
          birim: ["kg", "m3"]
        }
      ]
    },
    {
      id: 2,
      name: "SCOPE-2",
      states: [
        {
          id: 1,
          name: "Satın Alınan Enerji",
          cities: ["Elektrik"],
          birim: ["kW"]
        }
      ]
    },
    {
      id: 3,
      name: "SCOPE-3",
      states: [
        {
          id: 1,
          name: "Upstream Nakliye (aracın firmaya ait olması durumunda)",
          cities: ["Minibüs", "Otobüs", "Pazarlama", "Nakliye"],
          units: ["Dizel Yakıt", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin"],
          birim: ["lt"]
        },
        {
          id: 2,
          name: "Downstream Nakliye (hizmetin dışardan satın alınması durumunda)",
          // cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
          option: ["otobus icin yakit tuketimi", "otelde kisi sayisi", "taksi ile mi arac kiralama mi"],
          units: ["Dizel Yakıt", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin"],
          birim: ["lt"]
        }
      ]
    }
  ];

  
 // Plaka girişini düzenleyen fonksiyon
 const handlePlakaChange = (e) => {
  let value = e.target.value.toUpperCase(); // Küçük harfleri büyük yap
  
  // Plaka formatına uygun bir regex
  const plakaRegex = /^[0-9]{0,2}[A-Z]{0,3}[0-9]{0,4}$/;

  // Eğer regex ile eşleşiyorsa güncelle
  if (plakaRegex.test(value)) {
    setCheckPlaka(value);
    console.log("plaka",checkPlaka)
  }
};

  const Icon = ({ id, open }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`h-5 w-5 transition-transform ${id === open ? "rotate-90" : ""}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  };
  useEffect(() => {
    setSavedData((prev) => ({
      ...prev,
      type: selectedTab, // Güncellenmiş selectedTab'ı ekle
      plaka: checkPlaka, // Güncellenmiş checkPlaka'ı ekle

    }));
  }, [selectedTab,checkPlaka]); // selectedTab değiştiğinde çalışır
  
  
  const toggleAccordion = (id) => {
    setOpen(open === id ? null : id);
    setVideopen(true)
  };

  const months = [
    "Ay Seçin","Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];


   
    const getDynamicTitle = () => {
      if (selectedScope === "SCOPE-1") {
        return "TESİSTE ISINMA VE ÜRETİM AMACIYLA KULLANILAN ENERJİ TÜRLERİ";
      }
      if (selectedScope === "SCOPE-2") {
        return "TESİS BÜNYESİNDE KAYITLI ARAÇLARIN KULLANDIĞI YAKITLAR";
      }
      if (selectedScope === "SCOPE-3") {
        if (selectedState?.name === "Upstream Nakliye (aracın firmaya ait olması durumunda)") {
          return "TESİSE AİT ARAÇ EMİLSYONLARI";
        }
        if (selectedState?.name === "Downstream Nakliye (hizmetin dışardan satın alınması durumunda)") {
          return "SERVIS PAZARLAMA VE MUSTERI ZIYARETI KAPSAMINDAKI EMILSONLAR";
        }
        return "TESİSİNİZDE KULLANILAN SOĞUTUCU YANGIN TÜPLERİ(KARBON ESASLI)";
      }
      return "Seçili Kapsam Bilgileri";
    };

    const handleSituationChange = (newSituation) => {
      setSavedData((prev) => ({ ...prev, situation: newSituation }));
      console.log("data----",savedData)
  
    };

  const handleSave = async () => {

      const plakaValue = document.getElementById("plaka") ? document.getElementById("plaka").value : "";
      const cityValue = selectedState?.cities?.length > 0 ? document.querySelector("select").value : "";
      const birimValue = document.getElementById("birim")?.value || ""; // Birim seçimini al
      const unitValue = document.getElementById("birim")?.value || ""; // 🔹 HATAYI GİDERDİK
      const gasTypeValue = document.querySelectorAll("select")[2]?.value || ""; // Gaz Türü seçimini al
      const yakitTuruValue = document.getElementById("yakitturu")?.value || ""; // Yakıt Türü seçimini al

    
      const errors = {
        // city: checkUp && !cityValue, // checkUp seçiliyse city kontrolü yapılmalı
        city: !checkDown && !cityValue,
        birim: !birimValue, // Birim zorunlu kontrolü yapılmalı (hem checkUp hem checkDown için)
        amount: !document.querySelector("#amount").value,
        selection1: !selectionType,
        selection2: (selectionType === "month" && !selectedMonth) || (selectionType === "period" && !selectedPeriod),
        plaka: checkDown && !plakaValue, // checkDown seçiliyse plaka kontrolü yapılmalı
        gasType: showAdditionalSelect && !gasTypeValue, // Eğer showAdditionalSelect TRUE ise gasType zorunlu
        // yakitturu: (!checkUp && !checkDown) ? false : !yakitTuruValue, // **✅ Hem Downstream hem Upstream için zorunlu**
        // yakitturu: (!checkUp && !checkDown) ? false : !yakitTuruValue, // **✅ Hem Downstream hem Upstream için zorunlu**
        yakitturu: (checkUp || checkDown || checkYakit) ? !yakitTuruValue : false,

      };
    
      setFormErrors(errors);
      console.log("Form Errors:", errors);  // Hata objesinin detaylarını konsola yazdır

    
      if (!Object.values(errors).includes(true)) {

        const miktar = document.querySelector("#amount").value;

        // const isim = selectedScope === "SCOPE-1" || selectedScope === "SCOPE-2"
        // ? selectedState?.cities?.find(city => city === cityValue)
        // : selectedState?.units?.find(unit => unit === unitValue);

      const isim =
      selectedScope === "SCOPE-1" || selectedScope === "SCOPE-2"
      ? showAdditionalSelect
      ? selectedGasType // Gaz Türü seçildiyse
      : selectedState?.cities?.find(city => city === cityValue) // Şehir seçildiyse
      : selectedScope === "SCOPE-3"
      ? (selectedState.name === "Upstream Nakliye (aracın firmaya ait olması durumunda)" || selectedState.name === "Downstream Nakliye (hizmetin dışardan satın alınması durumunda)")
      ? (yakitTuruValue || "Yakıt Türü Seçilmedi!") // Yakıt Türü seçildiyse
      : (selectedState?.units?.find(unit => unit === unitValue) || "Birim Seçilmedi!") // Birim seçildiyse
      : "HATA! İsim bulunamadı";

     
      // Hesaplanan sonucu al
      const sonuc = CalculateFunction(isim, miktar);
      const numericSonuc = parseFloat(sonuc); // Sayıya çevir

       if (!sonuc || isNaN(parseFloat(sonuc))) {
        // **Hata mesajı göster ve işlemi durdur**
        toast.error("Hesaplama sonucu geçersiz! Lütfen verilerinizi kontrol edin.");
        return; // ❌ Kayıt işlemi burada durur
    }
    
    
      // Eğer 'sonuc' bir sayı değilse varsayılan olarak 0.000 ata
      // const formattedSonuc = typeof sonuc === "number" ? sonuc.toFixed(3) : "0.000";
      const formattedSonuc = !isNaN(numericSonuc) ? numericSonuc.toFixed(3) : "0.000";

      // Hesaplanan sonucu savedData içindeki miktar yerine yaz
      savedData.miktar = formattedSonuc;
  
      // console.log("Tüm Birimler:", selectedState);
      // console.log("type:", selectionType);

      // console.log("Seçilen Birim:", unitValue);
      // console.log("Birim Bulundu Mu?", selectedState?.units?.includes(unitValue));
      // console.log("isim:", isim);
      // console.log("mıktar:", miktar);
      // console.log("yakit turu:", yakitTuruValue);
      console.log("format:", formattedSonuc);
      console.log("sonuc:", numericSonuc);




      if (!isim || !miktar) {
        console.log("Hata: İsim veya miktar eksik!");
        return;
      }
  
      

    
      // **Tabloya ekle**
        const newData = {
          city: checkUp ? cityValue : selectedState?.cities?.[0] || "",
          birim: birimValue,
          amount: sonuc, // **✅ Hesaplanan sonucu kaydet**
          plaka: checkDown ? plakaValue : null,
          gasType: showAdditionalSelect ? gasTypeValue : null,
          yakitturu: yakitTuruValue, // **✅ Hem Downstream hem Upstream için kaydet**
        };
    
        

        if (editIndex !== null) {
          setTableData(prev => {
            const updatedData = [...prev];
            updatedData[editIndex] = newData;
            return updatedData;
          });
          setEditIndex(null);
        } else {
          setTableData(prev => [...prev, newData]);
        }

            // **MongoDB'ye API isteği gönder**
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " +token
              }
            };

            try {
              const response = await post('/adddata', savedData, config);
              console.log("API Yanıtı:", response.data);
              toast.success("Başarıyla kaydedildi!");
            } catch (error) {
              console.error("API Hatası:", error);
              toast.error("Kayıt sırasında bir hata oluştu.");
            }
    
        // toast.success("Başarıyla kaydedildi!");
        // console.log("tablo-----", tableData);
          // **Yeni verileri çekerek tabloyu güncelle**
          const response = await get("/getdailyscope", config);
          setTableData(response.data.data);
    
        setTimeout(() => {
          // **Formu sıfırla ama input kaybolmasın**
        // **✅ Hata mesajlarını sıfırla**
        setFormErrors({
          city: false,
          birim: false,
          amount: false,
          selection1: false,
          selection2: false,
          plaka: false,
          gasType: false,
          yakitturu: false, // **✅ Hata durumu sıfırlanmalı**
        });
    
        // Form resetleme işlemleri
        // setSelectedState(null);
        // ====
        setShowAdditionalSelect(false);
        setSelectionType("");
        setSelectedMonth("");
        setSelectedPeriod("");
        setCheckPlaka("");
        document.querySelector("#amount").value = "";
        setEditingAmount("");
        // =====
        
        

        setFormKey(Date.now()); // **Formu yeniden oluştur!**

      }, 100); // **100ms gecikme ile form sıfırlanır**

      } else {
        toast.error("Lütfen tüm alanları doldurun!");
      }
  };
     
  const handleCityChange = (e) => {
    
    const selectedCity = e.target.value;
    if ( selectedScope === 'SCOPE-1' && selectedState?.name === 'Doğrudan Sızma Kaçak Emisyon' && selectedCity !== "Yangın Söndürme Tüpü") {
      setShowAdditionalSelect(true);
    } else {
      setShowAdditionalSelect(false);
    }
  };

  const handleDelete = (item) => {
    setDeleteItem(item);
    setShowModal(true);
  };

  const confirmDelete = async (item) => {
    console.log("item--", deleteItem)
    const deleteScopeId = deleteItem?._id
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " + token,
        },
      };
  
      // **API isteği ile veriyi sil**
      await post("/deletedscope", { deleteScopeId }, config); 
  
      // **Başarı mesajı**
      toast.success("Silme işlemi başarılı!");
       // **Yeni verileri çekerek tabloyu güncelle**
       const responsetable = await get("/getdailyscope", config);
       setTableData(responsetable.data.data);
      setShowModal(false);


  
      // **Yeni verileri çekerek tabloyu güncelle**
      const response = await get("/getdailyscope", config); 
      setTableData(response.data.data); 
  
    } catch (error) {
      console.error("Silme hatası:", error);
      toast.error("Silme işlemi başarısız!");
    }
};

const handleSaveEdit = async () => {
  if (!editingAmount) {
    toast.error("Lütfen miktar girin!");
    return;
  }


  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
    };
    const data = {
      id: tableData[editIndex]?._id, // Güncellenmesi gereken satırın ID'si
      miktar: editingAmount, // 'amount' yerine 'miktar' olarak gönderiyoruz
    }
    // Güncellenen veriyi API'ye gönder
    const response = await put("/editdata", data,config);

    if (response.status === 200) {
      // Başarılı güncelleme sonrası state'i güncelle
      setTableData((prev) => {
        const updatedData = [...prev];
        updatedData[editIndex].miktar = editingAmount; // 'amount' yerine 'miktar' güncelleniyor
        return updatedData;
      });

      toast.success("Miktar başarıyla güncellendi!");
      setEditIndex(null);
      setEditingAmount("");
    } else {
      throw new Error("Güncelleme başarısız!");
    }
  } catch (error) {
    console.error("Hata:", error);
    toast.error("Miktar güncellenirken hata oluştu!");
  }
};


  const handleGasTypeChange = (value, isActive) => {
    if (isActive) {
      setSavedData(prev => ({
        ...prev,
        gasType: value,
      }));
    }
  };
  
  const handleChange = (key, value) => {
    setVideopen(true)
    setSavedData((prev) => {
      let updatedData = { ...prev, [key]: value };
  
      if (value === "SCOPE-3") {
        setCheckYakit(true);
        setShowAdditionalSelect(false);
      } 
      if (value === "SCOPE-1" || 
          value === 'SCOPE-2' ||
          value === "Doğrudan Sızma Kaçak Emisyon" ||
          value === "Sabit Yanma" ||
          value === "Hareketli Yanma" ||
          value === "Satın Alınan Enerji") {
        const { plaka,type,cartype,yakitturu, ...rest } = updatedData; // gasType'ı kaldır

          // **State'i güvenli şekilde güncelle**
          setSavedData({ ...rest });

        setCheckDown(false)
        setCheckYakit(false);
        setCheckUp(false)
      } 

      if ( value === "Sabit Yanma" ||
           value === "Hareketli Yanma" ||
           value === "Satın Alınan Enerji") {
            setShowAdditionalSelect(false);

    } 
  
      if (value === "Downstream Nakliye (hizmetin dışardan satın alınması durumunda)") {
        setCheckDown(true);
        setCheckUp(false);
        setCheckYakit(true);
        const { cartype,kaynak, ...rest } = updatedData; // gasType'ı kaldır
        updatedData = rest;
        updatedData = {
          ...updatedData,
          plaka: checkPlaka,
          yakitturu: "",
          type: selectedTab,
        };
      } else if (value === "Upstream Nakliye (aracın firmaya ait olması durumunda)") {
        setCheckDown(false);
        setCheckUp(true);
        setCheckYakit(true);
        const { plaka,type,kaynak, ...rest } = updatedData; // gasType'ı kaldır
        updatedData = rest;
        updatedData = {
          ...updatedData,
          cartype: "",
          yakitturu: "",
        };
      } 
      if (!showAdditionalSelect) {
        const { gasType, ...rest } = updatedData; // Eğer gaz türü seçimi kapalıysa, veriden kaldır
        updatedData = rest;
      }
    
  
      return updatedData;
    });
  
    // console.log("data----", value);
  };
  
  return (
    <>
    <div className='flex justify-between gap-2 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  mb-6 '>
            <div>
            </div>
            <div className='flex justify-end  w-50' >
                <div className="grid justify-end w-50" >
                    <div className=' px-5  justify-end w-100' >
                        <div className="flex justify-between">
                            <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.country ? facilitySend?.country : country?.native ? country?.native : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.country ? "#3de846" : country?.name ? "#3de846" : "black" }} className="fa-solid fa-flag" ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                        <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.city ? facilitySend?.city : dropcity?.name ? dropcity?.name : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.city? "#3de846" : dropcity  ? "#3de846" : "black" }} className="fas fa-globe-europe"  ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                        <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.state? facilitySend?.state : state?.name ? state?.name : "-----"}</span>
                            <span className="text-normal  justify-end"><i style={{ color:facilitySend?.state ? "#3de846" : state?.name ? "#3de846" : "black" }} className="fas fa-map-marker-alt" ></i></span>
                        </div>
                    </div>
                    <div className=' px-5  justify-end w-100'>
                        <div className="flex justify-between">
                            <span className="text-normal font-bold text-end w-100 me-5">{facilitySend?.facilityname ? facilitySend?.facilityname : sweet ? sweet : "-----"}</span>
                            <span className="text-normal  justify-end" ><i style={{ color:facilitySend?.facilityname ? '#3de846' : sweet   ? "#3de846" : "black" }} className="fas fa-industry" ></i></span>

                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div className="flex flex-col md:flex-row border border-stroke rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        
      <div className="w-full md:w-1/3 px-4 border border-stroke">
      {Countries.map((scope) => (
        <Accordion key={scope.id} open={open === scope.id}>
          <AccordionHeader
            onClick={() => {
              toggleAccordion(scope.id);
              setSelectedScope(scope.name);
              setShowTabs(false);
              setShowForm(false);
              handleChange("title", scope.name);
            }}
          >
            <div className="flex justify-between w-full">
              <span className="ml-2">{scope.name}</span>
              <Icon id={scope.id} open={open} />

            </div>
          </AccordionHeader>
          <AccordionBody>
            {scope.states.map((state) => (
              <button
                key={state.id}
                onClick={() => {
                  setSelectedState(state);
                  const isDownstream = state.name.includes("Downstream Nakliye");
                  setShowTabs(isDownstream);
                  setShowForm(!isDownstream);
                  handleChange("subtitle", state.name);
                  handleScrollToTarget()

                }}
                className={`my-3 ps-5 rounded-md block uppercase  ${
                  selectedState?.id === state.id ? "bg-blue-200" : "bg-sky-300"
                }`}
              >
                {state.name}
              </button>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
    </div>

      {videopen ?  <div ref={targetRef}  className="w-full md:w-2/3 md:ms-4 backdrop" form key={formKey}>
        <h2 className="text-lg font-semibold my-10 md:mt-0 md:text-md lg:text-md">{getDynamicTitle()}</h2>
        
        {selectedState && (
          <>
            {showTabs && (
           <div>
           <Tabs value={selectedTab}>
             <TabsHeader>
               <Tab
                 key="sahsi"
                 value="sahsi"
                 onClick={() => {
                   console.log("Şahsi seçildi");
                   setSelectedTab("sahsi");
                 }}
               >
                 Şahsi Araçlar
               </Tab>
               <Tab
                 key="servis"
                 value="servis"
                 onClick={() => {
                   console.log("Servis seçildi");
                   setSelectedTab("servis");
                 }}
               >
                 Servis Araçları
               </Tab>
               <Tab
                 key="ziyaret"
                 value="ziyaret"
                 onClick={() => {
                   console.log("Ziyaret seçildi");
                   setSelectedTab("ziyaret");
                 }}
               >
                 Müşteri Ziyaretleri
               </Tab>
               <Tab
                 key="seyahat"
                 value="seyahat"
                 onClick={() => {
                   console.log("Seyahat seçildi");
                   setSelectedTab("seyahat");
                 }}
               >
                 İş Seyahatleri
               </Tab>
             </TabsHeader>
           </Tabs>
     
           {/* <p>Seçili Tab: {selectedTab}</p> */}
         </div>
          
            )}
      
      {/* Kaynak */}
      <div className="mt-4">
  <label className="block">{checkDown ? "Plaka" : checkUp ? "Araç Türü" : "Kaynak"}</label>
  {checkDown ? (
    <div>
      <input
        type="text"
        id="plaka"
        className={`w-full p-2 border rounded ${formErrors.plaka ? "border-red-500" : "border-stroke"}`}
        placeholder="Plaka girin (örn: 34ABC123)"
        value={checkPlaka}
        onChange={handlePlakaChange}
        maxLength={9} // En fazla 9 karakter olmasını sağlıyoruz
      />
      {formErrors.plaka && <small className="text-red-500">Bu alan boş olamaz.</small>}
    </div>
  ) : (
    <select
      className={`w-full p-2 border rounded  ${formErrors.city ? "border-red-500" : "border-stroke"}`}
      onChange={(e) => {
        handleChange(checkDown ? null : checkUp ? "cartype" : 'kaynak', e.target.value);
        setFormErrors((prev) => ({ ...prev, city: false })); // `city`'yi sıfırlıyoruz
        handleCityChange(e);

      }}
    >
      <option value="">Seçim yapın</option>
      {selectedState?.cities?.map((city, index) => (
        <option key={index} value={city}>{city}</option>
      ))}
    </select>
  )}
  {!checkDown && formErrors.city && <small className="text-red-500">Bu alan boş olamaz.</small>}
</div>


          { checkYakit ?
             <div className="mt-4">
             <label className="block">Yakıt Türü</label>
             <select
               id="yakitturu"
               className={`w-full p-2 border rounded  ${formErrors.yakitturu ? "border-red-500" : "border-stroke"}`} // Hata durumunu `yakitturu`ya göre kontrol ettik
               onChange={(e) => {
                 handleChange("yakitturu", e.target.value);
                 setFormErrors((prev) => ({ ...prev, yakitturu: false })); // `yakitturu`yu güncelledik
               }}
             >
                   <option value="">Seçim yapın</option>

               {selectedState?.units?.map((unit, index) => (
                 <option key={index} value={unit}>
                   {unit}
                 </option>
               ))}
             </select>
             {formErrors.yakitturu && <small className="text-red-500">Bu alan boş olamaz.</small>} {/* Hata mesajını `yakitturu` için gösteriyoruz */}
           </div>
           : null
          }

      {/* Birim */}
<div className="mt-4">
  <label className="block">Birim</label>
  <select
    id="birim"
    className={`w-full p-2 border rounded  ${formErrors.birim ? "border-red-500" : "border-stroke"}`}
    onChange={(e) => {
      handleChange("birim", e.target.value);
      setFormErrors((prev) => ({ ...prev, birim: false })); // **✅ Hata mesajını sıfırla**
    }}
  >
    <option value="">Seçim yapın</option>
    {selectedState?.birim?.map((birim, index) => (
      <option key={index}>{birim}</option>
    ))}
  </select>
  {formErrors.birim && <small className="text-red-500">Bu alan boş olamaz.</small>}
</div>

      
      {/* Miktar */}
      <div className="mt-4">
        <label className="block">Miktar</label>
        <input
          id="amount"
          type="text"
          className={`w-full p-2 border rounded ${formErrors.amount ? "border-red-500" : "border-stroke"}`}
          onChange={(e) => {
            handleChange("miktar", e.target.value);
            setFormErrors((prev) => ({ ...prev, amount: false }));
          }}
        />
        {formErrors.amount && <small className="text-red-500">Bu alan boş olamaz.</small>}
      </div>

     {/* Gaz Turu */}
{showAdditionalSelect && (
  <div className="mt-4">
    <label className="block">Gaz Türü</label>
    <select
      className={`w-full p-2 border rounded  ${formErrors.gasType ? "border-red-500" : "border-stroke"}`}
      onChange={(e) => {
        setSelectedGasType(e.target.value);
        handleGasTypeChange(e.target.value, showAdditionalSelect);
        setFormErrors((prev) => ({ ...prev, gasType: false })); // Hata mesajını sıfırla
      }}
    >
      <option value="">Seçim yapın</option>
      {selectedState?.gastype?.map((gas, index) => (
        <option key={index}>{gas}</option>
      ))}
    </select>
    {formErrors.gasType && <small className="text-red-500">Bu alan boş olamaz.</small>}
  </div>
)}

        <div className="mt-4">
          <label className="block">Dönem/Ay Seçin</label>
          <select
            className={`w-full p-2 border rounded  ${formErrors.selection1 ? "border-red-500" : "border-stroke"}`}
            value={selectionType}
            onChange={(e) => {
              setSelectionType(e.target.value);
              setSelectedMonth(""); 
              setSelectedPeriod(""); 
              setFormErrors((prev) => ({ ...prev, selection1: false }));
            }}
          >
            <option value="">Seçiniz</option>
            <option value="month">Ay olarak kayıt</option>
            <option value="period">Dönem olarak kayıt</option>
          </select>
          {formErrors.selection1 && <small className="text-red-500">Bu alan boş olamaz.</small>}
        </div>

        {selectionType === "month" && (
          <div className="mt-4">
            <label className="block">Ay</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value)
                handleSituationChange(e.target.value)
                handleChange("situation", e.target.value);

              }}
            >
              {months.map((month, index) => (
                <option key={index}>{month}</option>
              ))}
            </select>
          </div>
        )}

        {selectionType === "period" && (
          <div className="mt-4">
            <label className="block">Dönem</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedPeriod}
              onChange={(e) =>{
                 setSelectedPeriod(e.target.value)
                 handleSituationChange(e.target.value)
                 handleChange("situation", e.target.value);


                }}
            >
              <option>Ocak - Mart</option>
              <option>Nisan - Haziran</option>
              <option>Temmuz - Eylul</option>
              <option>Ekim - Aralik</option>
            </select>
          </div>
        )}

       

        <button
                className="flex items-center gap-2 px-4 py-2 text-white rounded shadow-lg"
                style={{
                  background: "linear-gradient(to right, rgb(0, 255, 142), rgb(0, 160, 254))",
                }}
          
          onClick={handleSave}
        >
          {editIndex !== null ? "Kaydet" : "Ekle"}
        </button>

        {/* Tablo */}
        <div className="w-full overflow-x-auto">
          <h1 className="my-5 py-2 font-semibold border-t">KAYDEDILEN LISTE</h1>
          <table className="w-full table-auto border-collapse min-w-[600px]">
    <thead>
      <tr>
        <th className="border border-stroke px-4 py-2">Kaynak</th>
        <th className="border border-stroke px-4 py-2">Birim</th>
        <th className="border border-stroke px-4 py-2">Miktar</th>
        <th className="border border-stroke px-4 py-2">Düzenle</th>
        <th className="border border-stroke px-4 py-2">Sil</th>
      </tr>
    </thead>
    <tbody>
      {tableData?.map((row, index) => (
        <tr key={index}>
          <td className="border border-stroke px-4 py-2">
            {row.city || row.plaka || row.kaynak || row.cartype || 'Veri Hatalı geliyor...'}
          </td>
          <td className="border border-stroke px-4 py-2 flex justify-center">{row.birim}</td>
          <td className="border border-stroke text-center w-1/4">
            {editIndex === index ? (
              <input
              type="text"
              value={editingAmount}
              onChange={(e) => setEditingAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit();
                }
              }}
              className="border border-stroke p-1 rounded w-full"
            />
            ) : (
              row.miktar
            )}
          </td>
          <td className="border border-stroke px-4 py-2 flex justify-center">
            {editIndex === index ? (
              <button className="text-green-500" onClick={handleSaveEdit}>Kaydet</button>
            ) : (
              <button
                className="text-blue-500"
                onClick={() => {
                  setEditIndex(index);
                  setEditingAmount(row.miktar);
                }}
              >
                Düzenle
              </button>
            )}
          </td>
          <td className="border border-stroke px-4 py-2 text-center">
            <button className="text-red-500" onClick={() => handleDelete(row)}>Sil</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
        </div>
        </>
          )} 
       
      </div>
       
           :  <div className="w-full md:w-2/3 md:ms-4 backdrop" >
           <video width="auto" height="500" autoPlay={true} loop muted>
             <source src={Videokayit} type="video/mp4" />
           </video>
           <div className="footprint flex"><span className="video-title text-center" style={{background:'linear-gradient(to right, rgb(0 255 5), rgb(13 0 254))',WebkitBackgroundClip:'text',WebkitTextFillColor: 'transparent'}}>LÜTFEN KAYIT İÇİN TESİSLERDEN BİRİNİ SEÇİN <br/>VEYA YENİ BİR TESİS EKLEYİN</span>
           </div>
         </div>
       }
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl">Bu veriyi silmek istediğinizden emin misiniz?</h3>
            <p>{deleteItem?.city}</p>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={confirmDelete}
              >
                Sil
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                İptal Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
