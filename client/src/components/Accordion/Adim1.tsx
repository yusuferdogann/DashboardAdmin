import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function Component() {
  const [open, setOpen] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedScope, setSelectedScope] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sahsi");

  const Countries = [
    {
      id: 1,
      name: "SCOPE-1",
      states: [
        {
          id: 1,
          name: "Sabit Yanma",
          cities: ["Doğal Gaz", "Linyit Kömürü", "Yaş Biokütle"],
          birim: ["ton", "m3"]
        },
        {
          id: 2,
          name: "Hareketli Yanma",
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
          birim: ["lt"]
        },
        {
          id: 2,
          name: "Downstream Nakliye (hizmetin dışardan satın alınması durumunda)",
          cities: ["Personel işe gidiş-geliş", "Müşteri ziyaretli kaynaklı emilsyonlar", "İş seyahat kaynaklı emilsyonlar"],
          birim: ["lt"]
        }
      ]
    }
  ];

  const toggleAccordion = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="flex border border-stroke rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
      <div className="w-1/3 px-4">
        {Countries.map((scope) => (
          <Accordion key={scope.id} open={open === scope.id}>
            <AccordionHeader
              onClick={() => {
                toggleAccordion(scope.id);
                setSelectedScope(scope.name);
                setShowTabs(false);
                setShowForm(false);
              }}
            >
              <div className="flex items-center">
                <span className="ml-2">{scope.name}</span>
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
                  }}
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
        <h2 className="text-lg font-semibold">Seçili Kapsam Bilgileri</h2>
        {selectedState && (
          <div className="mt-4">
            {showTabs && (
              <Tabs value={selectedTab} onChange={(value) => setSelectedTab(value)}>
                <TabsHeader>
                  <Tab key="sahsi" value="sahsi">Şahsi Araçlar</Tab>
                  <Tab key="servis" value="servis">Servis Araçları</Tab>
                  <Tab key="ziyaret" value="ziyaret">Müşteri Ziyaretleri</Tab>
                  <Tab key="seyahat" value="seyahat">İş Seyahatleri</Tab>
                </TabsHeader>
              </Tabs>
            )}
            <label className="block">Kaynak</label>
            <select className="w-full rounded border  border-stroke  py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
              {selectedState?.cities?.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>
            
            <label className="block mt-4">Birim</label>
            <select className="w-full rounded border  border-stroke  py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
              {selectedState?.birim?.map((birim, index) => (
                <option key={index}>{birim}</option>
              ))}
            </select>

            <div className="mt-4">
              <label className="block">Miktar</label>
              <input type="text" className="w-full rounded border  border-stroke  py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// {
//  const isDownstream = savedData?.subtitle?.includes("Downstream Nakliye");
//   isDownstream ?  <input/>
//   : <select
//   className={`w-full p-2 border rounded ${formErrors.city ? "border-red-500" : ""}`}
//   onChange={(e) => {
//     handleChange("kaynak", e.target.value);
//     setFormErrors((prev) => ({ ...prev, city: false }));
//   }}
// >
//   {selectedState?.cities?.map((city, index) => (
//     <option key={index}>{city}</option>
//   ))}
// </select>
 
//  }