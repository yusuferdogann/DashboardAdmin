import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { userAuth } from "../../auth/userAuth"
import { get } from '../../server/Apiendpoint';
import CoverImage from '../../images/cover/revizecover.jpg'
import {
    Button,
   
  } from "@material-tailwind/react";

const PdfView = () => {
    const contentRef = useRef(null);
    const {token,facilitySend} = userAuth()

    console.log("pisikoloji----------",facilitySend)

    const [reportData,setReportData] = useState()
    const [periodData,setPeriodData] = useState()
    var currentdate = new Date(); 
    var datetime =    currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear()  

    useEffect(()=>{
        const config = {
          headers:{
              "Content-Type":"application/json",
              Authorization:"Bearer: "+ token
          }
              };
    
              const fetchData = async () => {
                const dataResult = await get('/getcardgraficdata',config);

                const reportperioddata = await get('/reportperioddata',config);

                setPeriodData(reportperioddata.data.data)
                console.log("reporttotal--------------",periodData?.KAPSAM1)

                console.log("report---------------",periodData?.KAPSAM3)

                setReportData(dataResult.data.data)
                // console.log("RESULT---------------",reportData?.CardScope3[0]?.miktar)
              }
              fetchData()
    },[])

    const convertToPdf = () => {
        const content = contentRef.current;

        const options = {
            filename: "TESIS:"+facilitySend?.facilityname +" "+ "TARIH:"+ datetime +" "+ 'Rapor.pdf',
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: {
                unit: 'in',
                format: 'A4',
                orientation: 'portrait',
            },
            // pagebreak: { after: '.beforeClass' },
            // pagebreakMode : 'avoid-all'
            pagebreak: {
                mode: ['avoid-all']
            },
        };

        html2pdf().set(options).from(content).save();
    };
    var val = localStorage.getItem('detail');
    var object = JSON.parse(val);
    return (
    <>
              {facilitySend?.facilityname? <Button onClick={convertToPdf} color="blue" variant="gradient">Rapor Al</Button> : "Lütfen Rapor İçin Öncelikle Tesis Seçmelisiniz."}  

        <div style={{visibility:'hidden'}}>

<div ref={contentRef}>
            <div >
            <div className='beforeClass' style={{ height: "100%",width:'100%',objectFit:'contain' }}><img  src={CoverImage} alt=""  /></div>
           
           <div style={{margin:'5rem'}}>
           <div className='flex justify-between'>
                <div><img width={100} style={{ borderRadius: '10px', margin: 0 }} src={object.company_logo} alt="" /></div>
                <span className='font-bold'>Rapor Tarihi: {datetime}</span>
            </div>
            <hr className='my-4' style={{ height: '2px solid black' }} />
            <span className='font-bold text-2xl'>ŞİRKET İSMİ: CARBONISTAN</span><h1 className='mt-2'> </h1>
            <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Kapsam başlıkları
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ocak-MART
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nisan-Haziran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Temmuz-Eylul
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ekim-Aralik
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                KAPSAM-1
                            </th>
                            <td className="px-6 py-4 tex">
                                {periodData?.KAPSAM1[0][0]?.miktar ? periodData?.KAPSAM1[0][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                                {periodData?.KAPSAM1[1][0]?.miktar ? periodData?.KAPSAM1[1][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                                {periodData?.KAPSAM1[2][0]?.miktar ? periodData?.KAPSAM1[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                            {periodData?.KAPSAM1[3][0]?.miktar ? periodData?.KAPSAM1[3][0]?.miktar : 'veri yok'}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                KAPSAM-2
                            </th>
                            <td className="px-6 py-4 tex">
                            {periodData?.KAPSAM2[0][0]?.miktar ? periodData?.KAPSAM2[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                            {periodData?.KAPSAM2[0][0]?.miktar ? periodData?.KAPSAM2[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                                {periodData?.KAPSAM2[2][0]?.miktar ? periodData?.KAPSAM2[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                            {periodData?.KAPSAM2[3][0]?.miktar ? periodData?.KAPSAM2[3][0]?.miktar : 'veri yok'}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                KAPSAM-3
                            </th>
                            <td className="px-6 py-4 tex">
                            {periodData?.KAPSAM3[0][0]?.miktar ? periodData?.KAPSAM3[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                            {periodData?.KAPSAM3[0][0]?.miktar ? periodData?.KAPSAM3[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                                {periodData?.KAPSAM3[2][0]?.miktar ? periodData?.KAPSAM3[2][0]?.miktar : 'veri yok'}
                            </td>
                            <td className="px-6 py-4">
                            {periodData?.KAPSAM3[3][0]?.miktar ? periodData?.KAPSAM3[3][0]?.miktar : 'veri yok'}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <hr className='mt-10' /> */}
            <h2 className='mt-20 font-bold text-large'>TOPLAM KARBON EMİLSYONLARI:</h2>
            <h3 className='font-bold text-large mt-3 mb-2'>KAPSAM-1:  {reportData?.CardScope1[0]?.miktar ? reportData?.CardScope1[0]?.miktar.toFixed(2) : 'veri yok'} /tonCo2e</h3>
            <h3 className='font-bold text-large mb-2'>KAPSAM-2:  {reportData?.CardScope2[0]?.miktar ? reportData?.CardScope2[0]?.miktar.toFixed(2) : 'veri yok'} /tonCo2e</h3>
            <h3 className='font-bold text-large'>KAPSAM-3:  {reportData?.CardScope3[0]?.miktar ? reportData?.CardScope3[0]?.miktar.toFixed(2) : 'veri yok'} /tonCo2e</h3>
            <hr className='mt-10' />
            <div className='html2pdf_page-break'></div>
            <div className='mt-15'>
                <span className='block'><span className='font-bold'>Adres:  </span>Şemsitebrizi, Vali İzzetbey Cd. No:2, 42030 Karatay/Konya</span>
                <span className='block'><span className='font-bold'>Site:  </span> www.carbonistan.com</span>
                <span className='block'><span className='font-bold'>Tel:  </span> 555 555 55 55</span>
            </div>
           </div>
            </div>

            </div>

        </div>
        </>
    );
};

export default PdfView;