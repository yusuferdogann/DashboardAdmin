import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // ✅ html2canvas-pro yerine
import { useRef, useEffect, useState } from "react";
import CoverImage from "../../images/cover/revizecover.jpg";
import { userAuth } from "../../auth/userAuth";
import { get } from "../../server/Apiendpoint";
import { FaFilePdf } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Spinner için

const PeriodReport = () => {
  const pdfContentRef = useRef(null);
  const { token, facilitySend } = userAuth();
  const [periodData, setPeriodData] = useState();
  const [reportData, setReportData] = useState();
  const [reportAdress, setReportAdress] = useState();
  const [checkStatus, setCheckStatus] = useState();
  const [loading, setLoading] = useState(false);

  const localData = localStorage.getItem("Facilityname");
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + token,
      },
    };

    const fetchData = async () => {
      const dataResult = await get("/getcardgraficdata", config);
      const reportperioddata = await get("/reportperioddata", config);
      const settingComeData = await get("/getfacilityinfo", config);

      setPeriodData(reportperioddata.data.data);
      setReportAdress(settingComeData?.data);
      setCheckStatus(reportperioddata);
      setReportData(dataResult.data.data);
    };

    fetchData();
  }, []);

  var val = localStorage.getItem("facilityInformation");
  var object = JSON.parse(val);

  const generatePDF = async () => {
    setLoading(true); // Spinner başlasın

    const pdf = new jsPDF("p", "mm", "a4");

    // Kapak Görseli Sayfası
    const coverCanvas = await html2canvas(document.getElementById("cover-page"), {
      scale: 2, // ✅ Daha yüksek çözünürlük
      useCORS: true,
      logging: false,
      backgroundColor: "#fff",
    });

    const coverImgData = coverCanvas.toDataURL("image/png");
    pdf.addImage(coverImgData, "PNG", 0, 0, 210, 297);
    pdf.addPage(); // İkinci sayfa ekle

    // İçerik Sayfası
    const contentCanvas = await html2canvas(document.getElementById("content-page"), {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#fff",
    });

    const contentImgData = contentCanvas.toDataURL("image/png");
    pdf.addImage(contentImgData, "PNG", 0, 0, 210, (contentCanvas.height * 210) / contentCanvas.width);

    pdf.save("report.pdf");
    setLoading(false); // Spinner kaybolsun
  };

  return (
    <>
      <button
        onClick={generatePDF}
        className="flex items-center mt-5 gap-2 px-4 py-2 text-white rounded shadow-lg"
        style={{
          background: "linear-gradient(to right, rgb(0, 255, 142), rgb(0, 160, 254))",
        }}
        disabled={loading}
      >
        {loading ? <ClipLoader color="#fff" size={20} /> : <FaFilePdf size={20} />}
        {loading ? "İndiriliyor..." : "Raporu İndir"}
      </button>

      <div style={{ opacity: "0" }}>
        {/* Kapak Görseli */}
        <div id="cover-page" style={{ width: "210mm", height: "297mm", position: "relative" }}>
          <img src={CoverImage} alt="Cover" style={{ width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#fff" }}>Dönemsel Rapor</h1>
          </div>
        </div>

        {/* Rapor İçeriği */}
        <div id="content-page" style={{ width: "210mm", padding: "30px", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img
              src={object?.company_logo}
              alt="Company Logo"
              style={{ borderRadius: "20px", width: "150px", padding: "10px" }}
            />
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>Rapor Tarihi: {datetime}</span>
          </div>
          <hr style={{ margin: "20px 0", borderTop: "2px solid black" }} />

          <h2 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "50px" }}>TESIS: {localData}</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid gray" }}>
            <thead style={{ background: "#f0f0f0", fontSize: "14px" }}>
              <tr>
                <th style={{ padding: "10px", border: "1px solid gray" }}>Kapsam Başlıkları</th>
                <th style={{ padding: "10px", border: "1px solid gray" }}>Ocak-Mart</th>
                <th style={{ padding: "10px", border: "1px solid gray" }}>Nisan-Haziran</th>
                <th style={{ padding: "10px", border: "1px solid gray" }}>Temmuz-Eylül</th>
                <th style={{ padding: "10px", border: "1px solid gray" }}>Ekim-Aralık</th>
              </tr>
            </thead>
            <tbody>
              {["KAPSAM1", "KAPSAM2", "KAPSAM3"].map((kapsam) => (
                <tr key={kapsam}>
                  <td style={{ padding: "10px", border: "1px solid gray" }}>{kapsam}</td>
                  {[0, 1, 2, 3].map((i) => (
                    <td key={i} style={{ padding: "10px", border: "1px solid gray" }}>
                      {periodData?.[kapsam]?.[i]?.[0]?.miktar || "veri yok"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PeriodReport;
