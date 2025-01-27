const Purchased = () => {
  return (
    <div>
         <div className="relative overflow-x-auto">
            <small className="block">Please list here all precursors that are produced OUTSIDE the installation (e.g. purchased) and consumed within the installation.</small>
            <small className="block">Please also list the country in which the relevant precursor was produced (see sheet "c_CodeLists" to find the correct country codes) and the relevant production routes, if known.</small>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Production process
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Route 1
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Route 2
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Route  3
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Route 4
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Route 5
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Error
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    PP1
                                </th>
                                <td className="px-6 py-1">
                                    Silver
                                </td>
                                <td className="px-6 py-2">
                                    Laptop
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    PP2
                                </th>
                                <td className="px-6 py-2">
                                    White
                                </td>
                                <td className="px-6 py-2">
                                    Laptop PC
                                </td>
                                <td className="px-6 py-2">
                                    $1999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    PP3
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    PP4
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    PP5
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-2">
                                    $2999
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    </div>
  )
}

export default Purchased