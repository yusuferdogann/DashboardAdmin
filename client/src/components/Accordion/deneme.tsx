import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { toast } from "react-toastify";  // React Toast kütüphanesini kullanıyoruz

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
  });
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false); 
  const [selectedGasType, setSelectedGasType] = useState(""); 

  const [tableData, setTableData] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); // Düzenleme yapılacak satırın indexi
  const [editingAmount, setEditingAmount] = useState(""); // Düzenleme için gizli input


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
          cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
          option: ["otobus icin yakit tuketimi", "otelde kisi sayisi", "taksi ile mi arac kiralama mi"],
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

  const toggleAccordion = (id) => {
    setOpen(open === id ? null : id);
  };

  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const getDynamicTitle = () => {
    if (selectedScope === "SCOPE-1") {
      return "TESİSTE ISINMA VE ÜRETİM AMACIYLA KULLANILAN ENERJİ TÜRLERİ";
    }
    return "Seçili Kapsam Bilgileri";
  };

  const handleSave = () => {
    const errors = {
      city: !selectedState?.cities || selectedState?.cities.length === 0,
      birim: !selectedState?.birim || selectedState?.birim.length === 0,
      amount: !document.querySelector("#amount").value,
      selection1: !selectionType,
      selection2: (selectionType === "month" && !selectedMonth) || (selectionType === "period" && !selectedPeriod),
    };

    setFormErrors(errors);

    if (!Object.values(errors).includes(true)) {
      const newData = {
        city: selectedState?.cities?.find(city => city === document.querySelector("select").value),
        birim: selectedState?.birim?.find(unit => unit === document.querySelectorAll("select")[1].value),
        amount: document.querySelector("#amount").value,
      };

      if (editIndex !== null) {
        // Update the existing data if editing
        setTableData(prev => {
          const updatedData = [...prev];
          updatedData[editIndex] = newData;
          return updatedData;
        });
        setEditIndex(null); // Reset edit mode
      } else {
        // Add new data if it's not in edit mode
        setTableData(prev => [...prev, newData]);
      }

      toast.success("Başarıyla kaydedildi!");

      // Reset form
      setSelectedState(null);
      setShowAdditionalSelect(false)
      setSelectionType("");
      setSelectedMonth("");
      setSelectedPeriod("");
      setFormErrors({
        city: false,
        birim: false,
        amount: false,
        selection1: false,
        selection2: false,
      });
      document.querySelector("#amount").value = '';
      setEditingAmount("");

    } else {
      toast.error("Lütfen tüm alanları doldurun!");
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    if (selectedCity !== "Yangın Söndürme Tüpü") {
      setShowAdditionalSelect(true);
    } else {
      setShowAdditionalSelect(false);
    }
  };

  // Modal için silme işlemi
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleDelete = (item) => {
    setDeleteItem(item);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setTableData(prev => prev.filter(item => item !== deleteItem));
    setShowModal(false);
    toast.success("Veri başarıyla silindi!");
  };
  const handleSaveEdit = () => {
    if (!editingAmount) {
      toast.error("Lütfen miktar girin!");
      return;
    }
  
    setTableData(prev => {
      const updatedData = [...prev];
      updatedData[editIndex].amount = editingAmount;
      return updatedData;
    });
  
    toast.success("Miktar güncellendi!");
    setEditIndex(null);
    setEditingAmount("");
  };
  
  return (
    <div className="flex">
      <div className="w-1/3 px-4">
        {Countries.map((scope) => (
          <Accordion key={scope.id} open={open === scope.id}>
            <AccordionHeader onClick={() => {
              toggleAccordion(scope.id);
              setSelectedScope(scope.name);
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

      <div className="w-2/3 p-4 border-l">
        <h2 className="text-lg font-semibold">{getDynamicTitle()}</h2>

        <div className="mt-4">
          <label className="block">Kaynak</label>
          <select
            className={`w-full p-2 border rounded ${formErrors.city ? "border-red-500" : ""}`}
            onChange={(e) => {
              setFormErrors((prev) => ({ ...prev, city: false }));
              handleCityChange(e);
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
            className={`w-full p-2 border rounded ${formErrors.birim ? "border-red-500" : ""}`}
            onChange={() => setFormErrors((prev) => ({ ...prev, birim: false }))}
          >
            {selectedState?.birim?.map((birim, index) => (
              <option key={index}>{birim}</option>
            ))}
          </select>
          {formErrors.birim && <small className="text-red-500">Bu alan boş olamaz.</small>}
        </div>

        <div className="mt-4">
          <label className="block">Miktar</label>
          <input
            id="amount"
            type="text"
            className={`w-full p-2 border rounded ${formErrors.amount ? "border-red-500" : ""}`}
            onChange={() => setFormErrors((prev) => ({ ...prev, amount: false }))}
          />
          {formErrors.amount && <small className="text-red-500">Bu alan boş olamaz.</small>}
        </div>

        <div className="mt-4">
          <label className="block">Yeni Seçim 1</label>
          <select
            className={`w-full p-2 border rounded ${formErrors.selection1 ? "border-red-500" : ""}`}
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
              onChange={(e) => setSelectedMonth(e.target.value)}
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
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>
        )}

      

        {/* Gaz Turu */}
        {showAdditionalSelect && (
          <div className="mt-4">
            <label className="block">Gaz Türü</label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedGasType(e.target.value)}
            >
              {selectedState?.gastype?.map((gas, index) => (
                <option key={index}>{gas}</option>
              ))}
            </select>
          </div>
        )}

        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSave}
        >
          {editIndex !== null ? "Kaydet" : "Ekle"}
        </button>

        {/* Tablo */}
        <div className="mt-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Kaynak</th>
                <th className="border px-4 py-2">Birim</th>
                <th className="border px-4 py-2">Miktar</th>
                <th className="border px-4 py-2">Duzenle</th>
                <th className="border px-4 py-2">Sil</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{row.city}</td>
                  <td className="border px-4 py-2">{row.birim}</td>
                  <td className="border px-4 py-2"> {editIndex === index ? (
                  <input
                    type="text"
                    value={editingAmount}
                    onChange={(e) => setEditingAmount(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  row.amount
                )}</td>
                  <td className="border px-4 py-2">
                  {editIndex === index ? (
                  <button className="text-green-500" onClick={handleSaveEdit}>Kaydet</button>
                ) : (
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setEditIndex(index);
                      setEditingAmount(row.amount);
                    }}
                  >
                    Düzenle
                  </button>
                )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(row)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
  );
}
