import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function StepperModal() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Dialog open={true} size="lg" className="p-6">
      <DialogHeader className="flex flex-col items-center w-full">
        {/* Stepper */}
        <div className="flex items-center w-full relative">
          <div className="relative flex items-center w-full">
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold z-10 bg-green-500">
                1
              </div>
              <div className={`w-full border-b-4 ${step >= 2 ? "border-green-500" : "border-[#d1d5dc]"}`}></div>
            </div>
            <div className="flex items-center w-full">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold z-10 ${step >= 2 ? "bg-green-500" : "bg-gray-300"}`}>
                2
              </div>
              <div className={`w-full border-b-4 ${step >= 3 ? "border-green-500" : "border-[#d1d5dc]"}`}></div>
            </div>
            <div className="flex items-center w-full">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold z-10 ${step >= 3 ? "bg-green-500" : "bg-gray-300"}`}>
                3
              </div>
              <div className={`w-full border-b-4 ${step >= 4 ? "border-green-500" : "border-[#d1d5dc]"}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold z-10 ${step >= 4 ? "bg-green-500" : "bg-gray-300"}`}>
                4
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>
      
      <DialogBody className="w-full">
        <div className="relative h-40 flex justify-center items-center w-full">
          <div className={`absolute w-full text-center transition-all duration-500 transform ${step === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Syusufdsfdf
          </div>
          <div className={`absolute w-full text-center transition-all duration-500 transform ${step === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Step 2 Content
          </div>
          <div className={`absolute w-full text-center transition-all duration-500 transform ${step === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            galatasary
          </div>
          <div className={`absolute w-full text-center transition-all duration-500 transform ${step === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Step 4 Content
          </div>
        </div>
      </DialogBody>
      
      <DialogFooter className="flex justify-between w-full">
        <Button onClick={prevStep} className="bg-red-500 text-white px-6 py-2 rounded-lg " disabled={step === 1}>
          Prev
        </Button>
        <Button onClick={nextStep} className="bg-green-500 text-white px-6 py-2 rounded-lg " disabled={step === 4}>
          Next
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
