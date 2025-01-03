import { useEffect, useState } from "react"

const index = (props:String) => {

const [tableData,setTableData] = useState(false)
// console.log("return-data",props.returnData)



  return (
    <div>
    
    {/* className='relative overflow-x-auto sm:rounded-lg mt-10' \\ kod satiri-8 //  */}

<div className="relative overflow-x-auto sm:rounded-lg mt-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {/* <th scope="col" className="px-6 py-3">
                    {props.state}
                </th> */}
                <th scope="col" className="px-6 py-3">
                    KAYNAK
                </th>
                <th scope="col" className="px-6 py-3">
                    BİRİM
                </th>
                <th scope="col" className="px-6 py-3">
                    MİKTAR
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    DÜZENLE
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    sil
                </th>
            </tr>
        </thead>
        {props.returnData?.map((item)=>(
            <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.kaynak}
                </th>
                <td className="px-6 py-4">
                    {item.birim}
                </td>
                <td className="px-6 py-4">
                    {item.miktar}
                </td>
                {/* <td className="px-6 py-4">
                    $2999
                </td> */}
                <td className="px-6 py-4 w-10 text-center">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="text-center relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Duzenle
                    </span>
                </button>
                </td>
                <td className="px-6 py-4 w-10">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Sil
                    </span>
                </button>     
                  
                </td>
            </tr> 
        </tbody> 
        ))}
    </table>
{props.returnData ? null : <div className="p-4 flex items-center justify-center text-lg mt-5">veri yok</div>
}
</div>

    </div>
  )
}

export default index