import React, { useState } from "react";
import ExcelJS from "exceljs"; // ExcelJS kütüphanesini ekliyoruz
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExcelUploader = () => {
  const [updatedCell, setUpdatedCell] = useState(""); // Kullanıcının girdiği yeni hücre değeri
  const [workbook, setWorkbook] = useState(null); // Excel çalışma kitabı (workbook)
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [downloading, setDownloading] = useState(false); // **İndirme işlemi durumu**

  // Excel dosyasını yükle ve işle
  const handleFetchExcel = async () => {
    setLoading(true);

    try {
      const fileId = "1qFBsqGxy0M-G1R2-0TUUaEc7mEolS9yv"; // Google Sheets ID
      const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Excel dosyası alınırken hata oluştu!");
      }

      const bufferArray = await response.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(bufferArray);

      const sheet = wb.getWorksheet("Veri_Girisi");
      if (!sheet) {
        toast.error('"Veri_Girisi" sayfası bulunamadı.');
        return;
      }

      setWorkbook(wb);
      setLoading(false);
      toast.success("Excel başarıyla alındı!");
    } catch (error) {
      setLoading(false);
      toast.error("Excel yüklenirken hata oluştu!");
      console.error("Yükleme hatası:", error);
    }
  };

  // Kullanıcı inputundan gelen veriyi Excel hücresine kaydet ve indir
  const handleDownloadExcel = () => {
    if (!workbook) {
      toast.error("Önce Excel dosyasını yükleyin!");
      return;
    }

    setDownloading(true); // **İndirme başladığında state değiştir**

    const sheet = workbook.getWorksheet("Veri_Girisi");
    const cellAddress = "G40"; // Güncellenecek hücre

    const cell = sheet.getCell(cellAddress);
    cell.value = updatedCell; // Kullanıcının girdiği değeri hücreye yaz

    // Hücre stilini ve hizalamasını koru
    cell.font = { bold: true, color: { argb: "0000FF" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };

    // Güncellenmiş Excel dosyasını indir
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "CBAM_Raporu_Guncellenmis.xlsx";
      link.click();

      toast.success("Güncellenmiş Excel indirildi!");
      setDownloading(false); // **İndirme tamamlandığında tekrar butonu aktif yap**
    });
  };

  return (
    <div className="mt-6">
      {/* Excel Yükleme Butonu */}
      <button onClick={handleFetchExcel} disabled={loading}>
        {loading ? "Yükleniyor..." : "Excel Yükle"}
      </button>

      {loading && <div className="spinner"></div>} {/* Yükleme sırasında spinner */}

      <div className="my-5">
        <input
          type="text"
          value={updatedCell}
          onChange={(e) => setUpdatedCell(e.target.value)}
          placeholder="Yeni Hücre Değeri"
        />
      </div>

      {/* Güncellenmiş Excel İndirme Butonu */}
      <button onClick={handleDownloadExcel} disabled={downloading}>
        {downloading ? "İndiriliyor..." : "Güncellenmiş Excel İndir"}
      </button>
    </div>
  );
};

export default ExcelUploader;
