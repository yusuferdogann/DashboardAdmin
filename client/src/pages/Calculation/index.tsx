import Dropdown from "../../common/Dropdown/index"
import DataPicker from "../../common/DataPicker/index"
import Input from "../../common/Input/index"

const index = ({cities,changeState,citiy}) => {
  return (
    <div className='p-3'>
      <div className='flex flex-col'>
      <span>Step 2 </span>
      <span>EMISSIN SOURCE SELECTION:<span>SCOPE 1/STATIONARY COMBUSTION</span></span>
      </div>
      <hr  className='my-4'/>
      <div className='grid grid-cols-2'>
      <DataPicker/>
      </div>
      <div className='grid grid-cols-3 gap-3 my-5'>
      <Dropdown title='Emission Source' selected='Select Source' cities={cities} changeState={changeState} citiy={citiy}/>
    <Dropdown title='Unit' selected='Select Unit'/>
    <Input/>
      </div>
      <hr className='mt-3'/>
    <div className='flex justify-end mt-4'>
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>

    </div>
    </div>
  )
}

export default index