import { useState, useEffect } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

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
        units: ["ton", "m3"]
      },
      {
        id: 2,
        name: "Hareketli Yanma",
        short: ["hareketli"],
        cities: ["Dizel Yakıt", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin"],
        units: ["lt"]
      },
      {
        id: 3,
        name: "Doğrudan Sızma Kaçak Emisyon",
        short: ["dogrudan"],
        birim: ["CO2", "R134a1", "R410a", "HFC32", "R601", "R601a"],
        cities: ["Su Sebili", "Buzdolabi", "Chiller", "Klima", "Yangın Söndürme Tüpü", "Endüstriyel Soğutucu"],
        units: ["kg", "m3"]
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
        units: ["kW"]
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
        cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
        units: ["Dizel Yakıt", "Sıvılaştırılmış Petrol Gazları (LPG)", "Benzin"],
        birim: ["lt"]
      }
    ]
  }
];

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

export default function Component() {
  const [open, setOpen] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedScope, setSelectedScope] = useState(null); // Seçilen Scope
  const [selectionType, setSelectionType] = useState(""); // Yeni Seçim 1'in türünü tutacak state
  const [selectedMonth, setSelectedMonth] = useState(""); // Ay seçimi
  const [selectedPeriod, setSelectedPeriod] = useState(""); // Dönem seçimi
  const [formErrors, setFormErrors] = useState({
    city: false,
    unit: false,
    amount: false,
    selection1: false,
    selection2: false,
  });
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false); // Yeni state ekledim
  
  const toggleAccordion = (id) => {
    setOpen(open === id ? null : id);
  };

  // Ay isimlerini tanımla
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  // Başlıkları dinamik hale getirmek için helper fonksiyon
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

  // useEffect ile dinamik başlık değişimini sağla
  useEffect(() => {
    // Her selectedScope veya selectedState değişiminde getDynamicTitle fonksiyonunu çağır
    console.log("Current Dynamic Title:", getDynamicTitle());
  }, [selectedScope, selectedState]);

  // Formu kaydetme işlemi
  const handleSave = () => {
    const errors = {
      city: !selectedState?.cities || selectedState?.cities.length === 0,
      unit: !selectedState?.units || selectedState?.units.length === 0,
      amount: !document.querySelector("#amount").value,
      selection1: !selectionType,
      selection2: (selectionType === "month" && !selectedMonth) || (selectionType === "period" && !selectedPeriod),
    };

    setFormErrors(errors);

    if (!Object.values(errors).includes(true)) {
      // Kaydetme işlemi yapılabilir
      alert("Form başarıyla kaydedildi!");
    }
  };

  // Yangın Söndürme Tüpü dışında bir element seçildiğinde additional select'i göster
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    if (selectedCity !== "Yangın Söndürme Tüpü") {
      setShowAdditionalSelect(true);
    } else {
      setShowAdditionalSelect(false);
    }
  };

  return (
    <div className="flex">
      {/* ACCORDION */}
      <div className="w-1/3 px-4">
        {Countries.map((scope) => (
          <Accordion key={scope.id} open={open === scope.id}>
            <AccordionHeader onClick={() => {
              toggleAccordion(scope.id);
              setSelectedScope(scope.name); // Seçilen scope bilgisi burada tutuluyor
            }}>
              <div className="flex items-center">
                <Icon id={scope.id} open={open} />
                <span className="ml-2">{scope.name}</span>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {scope.states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedState(state)}
                  className={`my-3 p-2 rounded-md ${selectedState?.id === state.id ? "bg-blue-200" : "bg-sky-300"}`}
                >
                  {state.name}
                </button>
              ))}
            </AccordionBody>
          </Accordion>
        ))}
      </div>

      {/* FORM ELEMENTLERİ */}
      <div className="w-2/3 p-4 border-l">
        {/* Dinamik başlık */}
        <h2 className="text-lg font-semibold">
          {getDynamicTitle()}
        </h2>

        <div className="mt-4">
          <label className="block">Kaynak</label>
          <select
            className={`w-full p-2 border rounded ${formErrors.city ? "border-red-500" : ""}`}
            onChange={(e) => {
              setFormErrors((prev) => ({ ...prev, city: false }));
              handleCityChange(e); // Kaynak değiştiğinde eklenen select'i kontrol et
            }}
          >
            {selectedState?.cities?.map((city, index) => (
              <option key={index}>{city}</option>
            ))}
          </select>
          {formErrors.city && <small className="text-red-500">Bu alan boş olamaz.</small>}
        </div>
        <div className="mt-4">
          <label className="block">Birim</label>
          <select
            className={`w-full p-2 border rounded ${formErrors.unit ? "border-red-500" : ""}`}
          >
            {selectedState?.birim?.map((unit, index) => (
              <option key={index}>{unit}</option>
            ))}
          </select>
          {formErrors.unit && <small className="text-red-500">Bu alan boş olamaz.</small>}
        </div>
        
        {/* Yangın Söndürme Tüpü dışında bir şey seçildiğinde eklenen select */}
        {showAdditionalSelect && (
          <div className="mt-4">
            <label className="block">Yeni Seçim</label>
            <select className="w-full p-2 border rounded">
              <option>Seçenek 1</option>
              <option>Seçenek 2</option>
              <option>Seçenek 3</option>
            </select>
          </div>
        )}

        {/* Kaydet butonu */}
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
