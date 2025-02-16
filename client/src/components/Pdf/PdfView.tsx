import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { userAuth } from "../../auth/userAuth"
import { get, post } from '../../server/Apiendpoint';
import CoverImage from '../../images/cover/revizecover.jpg'
import { Button } from "@material-tailwind/react";
import { handleErrorForFacility } from '../../common/utils/helpers'
import CReports from '../../pages/Report/CReports';
import PeriodReport from '../../pages/Report/PeriodReport';
import { useTranslation } from "react-i18next";
 
import { toast } from 'react-toastify';
const PdfView = () => {
    const contentRef = useRef(null);
    const { token, facilitySend } = userAuth()

    // console.log("pisikoloji----------",facilitySend)

    const [reportData, setReportData] = useState()
    const [periodData, setPeriodData] = useState()
    const [checkStatus, setCheckStatus] = useState()
    const [resportAdress, setReportAdress] = useState()
    const [reportText, setReportText] = useState('')
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear()
    const localData = localStorage.getItem("Facilityname")
    const { t, i18n } = useTranslation();

    console.log("localData-----", localData)
    useEffect(() => {
        if (localData === '' || !localData) {
            // handleErrorForFacility("Lütfen rapor almak istediğiniz tesisi seçin")
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };

        const fetchData = async () => {
            const dataResult = await get('/getcardgraficdata', config);

            const reportperioddata = await get('/reportperioddata', config);

            const settingComeData = await get('/getfacilityinfo', config);

            setPeriodData(reportperioddata.data.data)
            console.log("reporttotal--------------", periodData?.KAPSAM1)
            console.log("adress geldi---------------", settingComeData?.data?.data)
            setReportAdress(settingComeData?.data?.data)

            console.log("report---------------", periodData?.KAPSAM3)
            setCheckStatus(reportperioddata)
            setReportData(dataResult.data.data)
            // console.log("RESULT---------------",reportData?.CardScope3[0]?.miktar)
        }
        fetchData()
    }, [])

 // report limit kontrol fonksiyonu
const checkReportLimit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " +token, // token'ı eklediğinizden emin olun
        }
      };
  
      const response = await post('/checkReportLimit', {}, config); // Veritabanı API'ye isteği gönderin
  
      if (response.data.reportLimit <= 0) {
        toast.warning("Limitiniz doldu! Yeni Rapor  ekleyemezsiniz.");
        return false; // Limit 0 veya dolu ise false döndür
      }
  
      return true; // Limit uygunsa true döndür
    } catch (error) {
      console.error("Facility limit kontrol edilirken hata oluştu:", error);
      toast.error("Sunucu hatası! Daha sonra tekrar deneyin.");
      return false; // Hata durumunda false döndür
    }
  };

    const convertToPdf = () => {
        const content = contentRef.current;

        const options = {
            filename: "TESIS:" + facilitySend?.facilityname + " " + "TARIH:" + datetime + " " + 'Rapor.pdf',
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
    // var val = localStorage.getItem('detail');
    var val = localStorage.getItem('facilityInformation');

    var object = JSON.parse(val);

   // rapor seçme fonksiyonu
const handleReport = async (event) => {
    const selectedReport = event.target.value;
  
    // Eğer CBAM raporu seçildiyse, önce limit kontrolü yapılacak
    if (selectedReport === 'cbam') {
      const isLimitOk = await checkReportLimit();
  
      if (!isLimitOk) {
        // Eğer limit uygun değilse, işlem yapılmaz ve toast gösterilir.
        return;
      }
    }
  
    // Eğer her şey uygunsa, reportText'i güncelleyip ilgili raporu göster
    setReportText(selectedReport);
  };
   // JSX kısmında select input'u ve render işlemi
return (
    <>
      {checkStatus?.status === 200 ? (
        <select onChange={(event) => handleReport(event)} className='h-8 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none'>
          {t("report.select")}
          <option>{t("report.select")}</option>
          <option value='period'>{t("report.period")}</option>
          <option value='cbam'>{t("report.cbam")}</option>
        </select>
      ) : "Yükleniyor..."}
  
      {reportText === '' ? <div></div> : (
        reportText === 'period' ? (
          <div style={{ visibility: 'hidden' }}>
            {/* Dönem raporu içeriği */}
            <div ref={contentRef}>
              {/* İçerik */}
            </div>
          </div>
        ) : (
          <CReports />
        )
      )}
    </>
  );
};

export default PdfView;