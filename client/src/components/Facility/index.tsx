
const index = () => {
    return (
        <div className='grid grid-cols-3 gap-4 p-4 border border-slate-200 rounded-2xl bg-sky-100 mb-6 '>
            <div >
            <h6 className="mb-4">FACILITY STTINGS</h6>
            <div >
                <span className="mb-4">Faciality</span>
                <div className=" w-80">
                    <select id="countries" className="h-10 border border-gray-300 text-gray-600 text-base rounded-lg  mt-4 w-full py-2.5 px-4 ">
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
            </div>
            </div>
            <div className='col-span-2 flex items-end'>
                <div className='flex flex-col px-5'>
                <span className="text-sm">Office</span>
                <span className="text-sm font-bold">Facility Type</span>
                  
                    
                </div>
                <div className="flex flex-col px-5">
                    <span className="text-sm"> Office</span>
                    <span className="text-sm font-bold">Facility Type</span>
                    
                </div>
                <div className="flex flex-col px-5">
                    <span className="text-sm">Office</span>
                    <span className="text-sm font-bold">Facility Type</span>
                    
                </div>
            </div>
        </div>
    )
}

export default index