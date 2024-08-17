

const index = (props:String,{cities, citiy}) => {
  return (
    <div>
        <div className="block w-full">
      <label  className="block mb-2 text-sm font-medium text-gray-600 w-full">{props.title}</label>
      <select value={citiy} id="countries" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none" >
     
      {cities?.map((citiy,index) => (
          <option  key={index}>{citiy}</option>
      ))}
     
      
      </select>
      </div>
    </div>
  )
}

export default index