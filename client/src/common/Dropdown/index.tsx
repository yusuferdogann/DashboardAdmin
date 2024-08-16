

const index = (props:String,{changeState,state,states}) => {
  console.log("yess",props.states)
  return (
    <div>
        <div className="block w-full">
      <label  className="block mb-2 text-sm font-medium text-gray-600 w-full">{props.title}</label>
      <select id="countries" className="h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none" onChange={changeState} value={state}>
      {/* <option selected>{props.selected}</option> */}
     
      {states?.map((state,index) => (
          <option  key={index}>{state.name}</option>
      ))}
     
      
      </select>
      </div>
    </div>
  )
}

export default index