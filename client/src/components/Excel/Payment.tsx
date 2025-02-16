import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

export default function CustomModal() {
  const [selectedContent, setSelectedContent] = useState(0);

  const contents = [
    { title: "Başlık 1", text: "Bu, birinci dikdörtgenin içeriğidir." },
    { title: "Başlık 2", text: "Bu, ikinci dikdörtgenin içeriğidir." },
    { title: "Başlık 3", text: "Bu, üçüncü dikdörtgenin içeriğidir." }
  ];

  return (
    <Dialog open={true} size="md" className="p-6">
        <DialogHeader className="mb-4 flex flex-col items-center w-full">Odemeyi Onayla</DialogHeader>
      <div className="flex w-full h-[300px]">
        {/* Sol Panel */}
        <div className="w-1/3 flex flex-col items-center gap-4">
          <div
            className={`w-[300px] h-[150px] bg-gray-000 border border-stroke rounded-[20px] cursor-pointer  transition-all duration-300 hover:bg-gray-400 ${selectedContent === 0 ? "bg-gray-500 text-white" : ""}`}
            onClick={() => setSelectedContent(0)}
          >
             <div className="flex h-full">
              {/* Checkbox */}
              <div className="w-1/3 flex items-center justify-center">
                <input type="checkbox" className="w-6 h-6 bg-gray-100" />
              </div>
              {/* Başlık ve Fiyat */}
              <div className="w-2/3 flex flex-col justify-center">
                <span className="text-xl font-bold">AYLIK PAKET</span>
                <span className="text-lg text-gray-700">200$</span>
              </div>
            </div>
          </div>
          <div
            className={`w-[300px] h-[150px] bg-gray-000 border border-stroke rounded-[20px] cursor-pointer  transition-all duration-300 hover:bg-gray-400 ${selectedContent === 1 ? "bg-gray-500 text-white" : ""}`}
            onClick={() => setSelectedContent(1)}
          >
            <div className="flex h-full">
              {/* Checkbox */}
              <div className="w-1/3 flex items-center justify-center">
                <input type="checkbox" className="w-6 h-6 bg-gray-100" />
              </div>
              {/* Başlık ve Fiyat */}
              <div className="w-2/3 flex flex-col justify-center">
                <span className="text-xl font-bold">DONEMLIK PAKET</span>
                <span className="text-lg text-gray-700">200$</span>
              </div>
            </div>
          </div>
          <div
            className={`w-[300px] h-[150px] bg-gray-000 border border-stroke rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-gray-400 ${selectedContent === 2 ? "bg-gray-500 text-white" : ""}`}
            onClick={() => setSelectedContent(2)}
          >
            <div className="flex h-full">
              {/* Checkbox */}
              <div className="w-1/3 flex items-center justify-center">
                <input type="checkbox" className="w-6 h-6 bg-gray-100" />
              </div>
              {/* Başlık ve Fiyat */}
              <div className="w-2/3 flex flex-col justify-center">
                <span className="text-xl font-bold">YILLIK PAKET</span>
                <span className="text-lg text-gray-700">200$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="w-2/3 p-6 bg-white border border-stroke rounded-lg">
          <DialogHeader className="text-xl font-bold">{contents[selectedContent].title}</DialogHeader>
          <DialogBody className="mt-4">{contents[selectedContent].text}</DialogBody>
         
        </div>
        
      </div>
      <DialogFooter>
            <button>ileri</button>
          </DialogFooter>
    </Dialog>
  );
}
