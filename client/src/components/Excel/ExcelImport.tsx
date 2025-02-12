import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs"; // Exceljs kütüphanesini ekliyoruz
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExcelUploader = () => {
  const [updatedCell, setUpdatedCell] = useState(""); // Kullanıcının girdiği yeni hücre değeri
  const [wb, setWb] = useState(null); // Excel çalışma kitabı (wb) durumu
  const [loading, setLoading] = useState(false); // Yükleme durumu için state

  // Excel dosyasını yükle ve işle
  const handleFetchExcel = async () => {
    setLoading(true); // Yükleme başladığında spinner'ı göster

    try {
      const response = await fetch("/CBAM_Raporu.xlsx");
      if (!response.ok) {
        throw new Error("Excel dosyası alınırken hata oluştu!");
      }

      const bufferArray = await response.arrayBuffer();
      const workbook = XLSX.read(bufferArray, { 
        type: "array", 
        cellStyles: true, // Stil bilgilerini koruyarak oku
        sheetStubs: true, // Boş hücrelerin stil bilgilerini koru
      });

      // Excel dosyasının "Veri_Girisi" sayfasını al
      const sheetName = "Veri_Girisi";
      const sheet = workbook.Sheets[sheetName];

      if (!sheet) {
        toast.error(`"${sheetName}" sayfası bulunamadı.`);
        return;
      }

      setWb(workbook); // Excel dosyasını state'e kaydet
      setLoading(false); // Yükleme tamamlandığında spinner'ı kaldır

      toast.success("Excel başarıyla alındı!");
    } catch (error) {
      setLoading(false); // Yükleme tamamlanmadığında spinner'ı kaldır
      toast.error("Excel yüklenirken hata oluştu!");
      console.error("Yükleme hatası:", error);
    }
  };

  // Kullanıcı inputundan gelen veriyi Excel hücresine kaydet ve indir
  const handleDownloadExcel = () => {
    if (!wb) {
      toast.error("Excel dosyasını yükleyin!");
      return;
    }

    // "Veri_Girisi" sayfasını al
    const sheet = wb.Sheets["Veri_Girisi"];
    const cellAddress = "G40"; // Hücre adresi, örneğin "A1"

    // Kullanıcının inputunu ilgili hücreye ekle
    if (sheet[cellAddress]) {
      sheet[cellAddress].v = updatedCell; // "A1" hücresine yeni veri ekle

      // Hücrede formül varsa, stil ayarlarını yap
      if (sheet[cellAddress].f) {
        sheet[cellAddress].font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
        sheet[cellAddress].alignment = { vertical: "middle", horizontal: "center" }; // Orta hizalama
      } else {
        // Hücrede formül yoksa, normal değer ekle
        if (updatedCell instanceof Date && !isNaN(updatedCell)) {
          const dateObj = new Date(updatedCell.getTime() - updatedCell.getTimezoneOffset() * 60000);
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const year = dateObj.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;

          sheet[cellAddress].v = formattedDate; // Excel'e tarih formatında yaz
        } else {
          sheet[cellAddress].v = updatedCell; // Normal değer
        }

        
        sheet[cellAddress].font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
        sheet[cellAddress].alignment = { vertical: "middle", horizontal: "center" }; // Orta hizalama
      }
    }

    // Excel dosyasını yazma işlemi
    const wbout = XLSX.write(wb, { 
      bookType: "xlsx", 
      type: "array", 
      cellStyles: true, // Stilleri koruyarak yaz
      sheetStubs: true, // Boş hücrelerin stilini koru
    });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CBAM_Raporu_Guncellenmis.xlsx"; // İndirilmiş dosyanın adı
    link.click();
    toast.success("Güncellenmiş Excel dosyası indirilmeye başlandı!");
  };

  return (
    <div className="mt-6">

      {/* Yükleme sırasında Spinner */}
      <button onClick={handleFetchExcel} disabled={loading}>
        {loading ? "Yükleniyor..." : "Excel Yükle"}
      </button>

      {loading && <div className="spinner"></div>} {/* Spinner göstermek için bir div */}

      <div className="my-5">
        <input
          type="text"
          value={updatedCell}
          onChange={(e) => setUpdatedCell(e.target.value)}
          placeholder="Yeni Hücre Değeri"
        />
      </div>

      <button onClick={handleDownloadExcel}>Güncellenmiş Excel İndir</button>
    </div>
  );
};

export default ExcelUploader;
