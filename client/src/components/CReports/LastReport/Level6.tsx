import { Card, Typography, Menu, MenuHandler, MenuList, MenuItem, Button, Input, Select, Option } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ExcelExportHelper from "../../Excel/ExcelExportCompoment";
const TABLE_HEAD = ["#", "Method", "Kaynak Akış Adı", "Activity Data (AD)", "AD Unit", "Fatura Değeri(m3)", "Üretim Yüzdesi"];

const menuItems = [
    {
        title: "@material-tailwind/html",

    },
    {
        title: "@material-tailwind/react",

    },
    {
        title: "Material Tailwind PRO",

    },
];

const DATA = [
    {
        STUDENT_DETAILS: {
            id: 'i.',
            name: "Kurululuş Adı(opsiyonel)",
            parentName: "",
        },
        MARKS: {
            id:'G1',
            maths: '',
            physics: '',
            chemistry: '',
            english: '',
            computerScience: '',
        },
        TABLE3: {
            id: 'P1',
            name: "",
            parentName: "",

        },
        TABLE4: {
            id: 'PP1',
            name: "",
            parentName: "",

        },
        TABLE5: {
            id: 'Ex.1',
            name: "Combustion",
            parentName: "Heavy fuel oil",
            activity:"252.000,00",
            unit:"t"
        },
        TABLE6: {
            id: 'i.',
            name: "Elektrik",
            parentName: "tCO2e",
            percent:'1%',
            nan:"2",
            kwh:"400"
        },
        TABLE7: {
            id: 'i.',
            name: "",
            parentName: "",
            percent:'',
            nan:"",
            kwh:""
        },
    },
    {
        STUDENT_DETAILS: {
            id: 'ii.',
            name: "Kuruluş Adı",
            parentName: "",

        },
        MARKS: {
            id:'G2',
            maths: '',
            physics: '',
            chemistry: '',
            english: '',
            computerScience: '',
        },
        TABLE3: {
            id: 'P2',
            name: "",
            parentName: "",

        },
        TABLE4: {
            id: 'PP2',
            name: "",
            parentName: "",

        },
        TABLE5: {
            id: 'Ex.2',
            name: "Process Emissions",
            parentName: "Raw meal for clinker",
            activity:"121.000,00",
            unit:"t"

        },
        TABLE6: {
            id: 'ii.',
            name: "Elektrik Emisyon Değeri",
            parentName: "tCO2/MWh",
            percent:'0.442',
            nan:"",
            kwh:""
        },
        TABLE7: {
            id: 'i.',
            name: "",
            parentName: "",
            percent:'',
            nan:"",
            kwh:""
        },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'iii.',
            name: "Adres",
            parentName: "",

        },
        MARKS: {
            id:'G3',
            maths: '',
            physics: '',
            chemistry: '',
            english: '',
            computerScience: '',
        },
        TABLE3: {
            id: 'P3',
            name: "",
            parentName: "",

        },
        TABLE4: {
            id: 'PP3',
            name: "",
            parentName: "",

        },
        TABLE5: {
            id: 'Ex.3',
            name: "Mass balance",
            parentName: "Steel",
            activity:"-1.808.226,00",
            unit:"t"

        },
        TABLE7: {
            id: 'i.',
            name: "",
            parentName: "",
            percent:'',
            nan:"",
            kwh:""
        },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'iv.',
            name: "Kuruluş Üretim Konusu",
            parentName: "",

        },
        MARKS: {
            id:'G4',
            maths: '',
            physics: '',
            chemistry: '',
            english: '',
            computerScience: '',
        },
        TABLE3: {
            id: 'P4',
            name: "",
            parentName: "",

        },
        TABLE4: {
            id: 'PP4',
            name: "",
            parentName: "",

        },
        TABLE5: {
            id: '1',
            name: "Combustion",
            parentName: "Doğalgaz",
            activity:"1.340,00",
            unit:"t",
            value:"2.000,00",
            productvalue:"1%"

        },
        TABLE7: {
            id: 'i.',
            name: "",
            parentName: "",
            percent:'',
            nan:"",
            kwh:""
        },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'v.',
            name: "Posta Kodu",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
        TABLE5: {
            id: '2',
            name: "",
            parentName: "",
            activity:"",
            unit:"",
            value:"",
            productvalue:""

        },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'vi.',
            name: "P.O. Box:",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
        TABLE5: {
            id: '3',
            name: "",
            parentName: "",
            activity:"",
            unit:"",
            value:"",
            productvalue:""

        },
    },
    {
        STUDENT_DETAILS: {
            id: 'vii.',
            name: "Şehir",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'viii.',
            name: "Ülke",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'ix.',
            name: "Ülke Kodu",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'x.',
            name: "Ana Emisyon Kaynağının Koorinatı(Enlem)",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'xi.',
            name: "Ana Emisyon Kaynağının Koorinatı(Boylam)",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'xii.',
            name: "Yetkili Temsilcinin Adı",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'xiii.',
            name: "E-Mail",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
    {
        STUDENT_DETAILS: {
            id: 'xiv.',
            name: "Telefon",
            parentName: "",

        },
        // MARKS: {
        //     id:'G1',
        //     maths: 70,
        //     physics: 75,
        //     chemistry: 82,
        //     english: 72,
        //     computerScience: 60,
        // },
       
    },
];


const Level6 = () => {

    return (
        <>
            <ExcelExportHelper data={DATA} />
            <Card className="h-full w-full mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
                  <table className="w-full min-w-max table-auto text-left">
            
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
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
                          <Select variant="standard" label="Select Version">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                          </Select>
                          {/* </Typography> */}
                        </td>
                        <td className="p-2">
                        <Select variant="standard" label="Country Code">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                          </Select>
                        </td>
                        <td className="p-2">
                          <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                            <input type="text" style={{padding:'.60rem', width: '130px', borderBottom: '1px solid #b0bec5' }} />
                          </Typography>
                        </td>
                        <td className="p-2">
                          <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                            <input type="text" style={{padding:'.60rem', width: '130px', borderBottom: '1px solid #b0bec5' }} />
                          </Typography>
                        </td>
                        <td className="p-2">
                          <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                            <input type="text" style={{padding:'.60rem', width: '130px', borderBottom: '1px solid #b0bec5' }} />
                          </Typography>
                        </td>
                        <td className="p-2">
                          <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                            <input type="text" style={{padding:'.60rem', width: '130px', borderBottom: '1px solid #b0bec5' }} />
                          </Typography>
                        </td>
                     
                        
            
                      </tr>
            
                    </tbody>
                  </table>
                </Card>

        </>
    );
}

export default Level6