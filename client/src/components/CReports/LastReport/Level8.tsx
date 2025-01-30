import { Card, Typography, Menu, MenuHandler, MenuList, MenuItem, Button, Input, Select, Option } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ExcelExportHelper from "../../Excel/ExcelExportCompoment";
const TABLE_HEAD = ["ID", "Total Production Levels", "Production Route", "Unit", "Üretilen Adet", "Satılan Adet"];




const Level8 = () => {

    return (
        <>
            <Card className="h-full w-full mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
                  <table className="w-full min-w-max table-auto text-left">
            
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70 text-center"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
            
                    <tbody>
            
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
            
                          PP1
            
                        </td>
            
                        <td className="p-4 denemeinput">
                          {/* <Typography variant="small" color="blue-gray" className="font-normal"> */}
                          {/* <Input variant="standard" style={{minWidth:"100px"}} className="denemeinput"/> */}
                          <input type="text" style={{padding:'.60rem',  borderBottom: '1px solid #b0bec5' }} />

                          {/* </Typography> */}
                        </td>
                        <td className="p-2 denemeinput">
                        <input type="text" style={{padding:'.60rem',  borderBottom: '1px solid #b0bec5' }} />

                        </td>
                        <td className="p-2 denemeinput">
                            <input type="text" style={{padding:'.60rem',  borderBottom: '1px solid #b0bec5' }} />
                          
                        </td>
                        <td className="p-2 denemeinput">
                            <input type="text" style={{padding:'.60rem',  borderBottom: '1px solid #b0bec5' }} />
                        </td>
                        <td className="p-2 denemeinput">
                            <input type="text" style={{padding:'.60rem',  borderBottom: '1px solid #b0bec5' }} />
                        </td>
                      
                     
                        
            
                      </tr>
            
                    </tbody>
                  </table>
                </Card>

        </>
    );
}

export default Level8