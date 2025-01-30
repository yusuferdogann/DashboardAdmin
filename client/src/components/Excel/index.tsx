import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExcelEditor = () => {
  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]); // Sayfa isimleri
  const [selectedSheet, setSelectedSheet] = useState(""); // Seçilen sayfa
  const [cellAddress, setCellAddress] = useState(""); // Hücre adresi (örn: A1)
  const [newValue, setNewValue] = useState(""); // Yeni veri

  // Excel dosyasını okuma fonksiyonu
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Dosyayı okuyarak sayfa isimlerini al
    const reader = new FileReader();
    reader.readAsBinaryString(selectedFile);

    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      // Sayfa isimlerini al
      setSheetNames(workbook.SheetNames);
      setSelectedSheet(workbook.SheetNames[0]); // İlk sayfayı seçili yap
    };
  };

  // Excel dosyasını seçilen sayfada güncelleme fonksiyonu
  const updateExcel = async () => {
    if (!file) {
      alert("Lütfen önce bir Excel dosyası yükleyin!");
      return;
    }
    if (!selectedSheet) {
      alert("Lütfen güncellenecek sayfayı seçin!");
      return;
    }
    if (!cellAddress.match(/^[A-Z]+[0-9]+$/i)) {
      alert("Lütfen geçerli bir hücre adresi girin! (Örnek: A1, B2, C10)");
      return;
    }
    if (!newValue) {
      alert("Lütfen yeni değeri girin!");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async (e) => {
        const buffer = e.target.result;

        // ExcelJS ile dosyayı işle
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // Seçilen sayfayı bul
        const sheet = workbook.getWorksheet(selectedSheet);
        if (!sheet) {
          alert(`"${selectedSheet}" sayfası bulunamadı!`);
          return;
        }

        // Seçilen hücreyi güncelle
        const cell = sheet.getCell(cellAddress.toUpperCase());
        cell.value = newValue;
        cell.font = { bold: true, color: { argb: "FF0000" } }; // Kırmızı ve kalın yap

        // Yeni Excel dosyasını oluştur ve indir
        const updatedBuffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([updatedBuffer]), "guncellenmis_dosya.xlsx");
      };
    } catch (error) {
      console.error("Excel güncelleme hatası:", error);
      alert("Bir hata oluştu. Lütfen geçerli bir Excel dosyası yüklediğinizden emin olun.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Excel Düzenleyici</h2>

      {/* Dosya Yükleme */}
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <br /><br />

      {/* Kullanıcıdan Sayfa Seçmesini İste */}
      {sheetNames.length > 0 && (
        <>
          <label>Sayfa Seç:</label>
          <select value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)}>
            {sheetNames.map((sheet) => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
          <br /><br />
        </>
      )}

      {/* Kullanıcıdan Hücre Adresi ve Yeni Değer Al */}
      <label>Güncellenecek Hücre (örn: A1): </label>
      <input
        type="text"
        value={cellAddress}
        onChange={(e) => setCellAddress(e.target.value)}
        placeholder="Örn: A1"
      />
      <br /><br />

      <label>Yeni Değer: </label>
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder="Yeni Veri"
      />
      <br /><br />

      {/* Güncelleme Butonu */}
      <button onClick={updateExcel} disabled={!file || !selectedSheet}>
        Excel Güncelle & İndir
      </button>
    </div>
  );
};

export default ExcelEditor;
