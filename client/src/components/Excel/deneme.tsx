import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExcelEditor = () => {
  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]); // Sayfa isimleri
  const [selectedSheet, setSelectedSheet] = useState(""); // Seçilen sayfa
  const [inputValues, setInputValues] = useState({
    H65: "",
    B1: "",
    C1: "",
    D1: "",
    E1: "",
    F1: "",
    G1: "",
    H1: "",
    I1: "",
  }); // 9 input için değerler

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

  // Excel dosyasını seçilen sayfada güncelleme ve şifreleme fonksiyonu
  const updateExcel = async () => {
    if (!file) {
      alert("Lütfen önce bir Excel dosyası yükleyin!");
      return;
    }
    if (!selectedSheet) {
      alert("Lütfen güncellenecek sayfayı seçin!");
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

        // Input değerleriyle hücreleri güncelle
        Object.keys(inputValues).forEach((cell) => {
          const value = inputValues[cell];
          if (value) {
            const excelCell = sheet.getCell(cell);
            excelCell.value = value;
            excelCell.font = { bold: true, color: { argb: "FF0000" } }; // Kırmızı ve kalın yap
          }
        });

        // Hücreleri gizlemek
        // Hücreleri gizle (örn. A1 hücresini gizlemek)
        sheet.getColumn(1).hidden = true; // 1. sütunu gizle
        sheet.getColumn(2).hidden = true; // 2. sütunu gizle
        sheet.getColumn(3).hidden = true; // 3. sütunu gizle
        // Diğer sütunlar için de aynı şekilde gizleme işlemi yapılabilir

        // Sayfa şifreleme işlemi
        sheet.protect("1234"); // "1234" şifre olarak belirlenir, kullanıcı bunu değiştirebilir

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

      {/* 9 input alanı */}
      {["H65", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"].map((cell) => (
        <div key={cell}>
          <label>{cell} Hücresine Yeni Değer: </label>
          <input
            type="text"
            value={inputValues[cell]}
            onChange={(e) => setInputValues({ ...inputValues, [cell]: e.target.value })}
            placeholder={`Yeni Değer için ${cell}`}
          />
          <br /><br />
        </div>
      ))}

      {/* Güncelleme Butonu */}
      <button onClick={updateExcel} disabled={!file || !selectedSheet}>
        Excel Güncelle & İndir
      </button>
    </div>
  );
};

export default ExcelEditor;
