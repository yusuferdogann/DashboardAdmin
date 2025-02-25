import { useEffect, useRef, useState } from 'react';
import { get, post } from '../../server/Apiendpoint';
import { userAuth } from "../../auth/userAuth";
import { toast } from 'react-toastify';
import CReports from '../../pages/Report/CReports';
import PeriodReport from '../../pages/Report/PeriodReport';
import { useTranslation } from "react-i18next";

const PdfView = () => {
    const { token } = userAuth();
    const [reportData, setReportData] = useState();
    const [periodData, setPeriodData] = useState();
    const [checkStatus, setCheckStatus] = useState();
    const [reportText, setReportText] = useState('');
    const { t } = useTranslation();
    const localData = localStorage.getItem("Facilityname");

    useEffect(() => {
        if (!localData) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer: " + token
            }
        };

        const fetchData = async () => {
            try {
                const [dataResult, reportPeriodData] = await Promise.all([
                    get('/getcardgraficdata', config),
                    get('/reportperioddata', config)
                ]);

                setPeriodData(reportPeriodData.data.data);
                setCheckStatus(reportPeriodData?.data?.data);
                setReportData(dataResult.data.data);
            } catch (error) {
                console.error("Veri çekilirken hata oluştu:", error);
            }
        };

        fetchData();
    }, [localData, token]);

    // Rapor limiti kontrol fonksiyonu
    const checkReportLimit = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer: " + token
                }
            };

            const response = await post('/checkReportLimit', {}, config);

            if (response.data.reportLimit <= 0) {
                toast.warning("Limitiniz doldu! Yeni rapor ekleyemezsiniz.");
                return false;
            }

            return true;
        } catch (error) {
            console.error("Facility limit kontrol edilirken hata oluştu:", error);
            toast.error("Sunucu hatası! Daha sonra tekrar deneyin.");
            return false;
        }
    };

    // Rapor seçme fonksiyonu
    const handleReport = async (event) => {
        const selectedReport = event.target.value;

        if (selectedReport === 'cbam') {
            const isLimitOk = await checkReportLimit();
            if (!isLimitOk) return;
        }

        setReportText(selectedReport);
    };

    return (
        <>
                <select onChange={handleReport} className='h-8 border border-stroke text-gray-600 text-base rounded-lg block w-full py-1 px-4 focus:outline-none'>
                    <option>{t("report.select")}</option>
                    <option value='period'>{t("report.period")}</option>
                    <option value='cbam'>{t("report.cbam")}</option>
                </select>

            {reportText === 'period' && <PeriodReport />}
            {reportText === 'cbam' && <CReports />}
        </>
    );
};

export default PdfView;
