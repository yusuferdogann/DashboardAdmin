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
  const [selectValues, setSelectValues] = useState({
    J1: "",
    K1: "",
  }); // 2 select için değerler

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

        // Select değerleriyle hücreleri güncelle
        Object.keys(selectValues).forEach((cell) => {
          const value = selectValues[cell];
          if (value) {
            const excelCell = sheet.getCell(cell);
            excelCell.value = value;
            excelCell.font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
          }
        });

        // Sayfa şifreleme işlemi (VERİ_GİRİŞİ sayfası)
        if (sheet.name === "VERİ GİRİŞİ") {
          // Sayfayı şifrele
          sheet.protect('1234', {
            selectLockedCells: true,   // Korunan hücreleri seçebilsin
            selectUnlockedCells: true, // Korumasız hücreleri seçebilsin
            formatCells: false,        // Hücre formatı değiştirilemesin
            formatColumns: false,      // Sütun formatı değiştirilemesin
            formatRows: false,         // Satır formatı değiştirilemesin
            insertColumns: false,      // Sütun eklenemesin
            insertRows: false,         // Satır eklenemesin
            deleteColumns: false,      // Sütun silinmesin
            deleteRows: false,         // Satır silinmesin
            sort: false,               // Veriler sıralanamasın
            autoFilter: false,         // Filtre değiştirilemesin
            pivotTables: false         // Pivot tablo değiştirilemesin
          });
        }

        // Yeni Excel dosyasını oluştur ve indir
        const updatedBuffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([updatedBuffer]), "guncellenmis_dosya.xlsx");
      };
    } catch (error) {
      console.error("Excel güncelleme hatası:", error);
      alert("Bir hata oluştu. Lütfen geçerli bir Excel dosyası yüklediğinizden emin olun.");
    }
  };

  // Input değeri değiştiğinde state'i güncelleme
  const handleInputChange = (e, cell) => {
    setInputValues({
      ...inputValues,
      [cell]: e.target.value,
    });
  };

  // Select değeri değiştiğinde state'i güncelleme
  const handleSelectChange = (e, cell) => {
    setSelectValues({
      ...selectValues,
      [cell]: e.target.value,
    });
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
          <label htmlFor="sheet-select">Sayfa Seç:</label>
          <select id="sheet-select" value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)}>
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
      <div>
        <label htmlFor="H65">Dogalgaz:</label>
        <input
          id="H65"
          type="text"
          value={inputValues["H65"]}
          onChange={(e) => handleInputChange(e, "H65")}
          placeholder=""
        />
        <br /><br />
        
        <label htmlFor="B1">B1 Hücresine Yeni Değer:</label>
        <input
          id="B1"
          type="text"
          value={inputValues["B1"]}
          onChange={(e) => handleInputChange(e, "B1")}
          placeholder="Yeni Değer için B1"
        />
        <br /><br />
        
        <label htmlFor="C1">C1 Hücresine Yeni Değer:</label>
        <input
          id="C1"
          type="text"
          value={inputValues["C1"]}
          onChange={(e) => handleInputChange(e, "C1")}
          placeholder="Yeni Değer için C1"
        />
        <br /><br />
        
        <label htmlFor="D1">D1 Hücresine Yeni Değer:</label>
        <input
          id="D1"
          type="text"
          value={inputValues["D1"]}
          onChange={(e) => handleInputChange(e, "D1")}
          placeholder="Yeni Değer için D1"
        />
        <br /><br />
        
        <label htmlFor="E1">E1 Hücresine Yeni Değer:</label>
        <input
          id="E1"
          type="text"
          value={inputValues["E1"]}
          onChange={(e) => handleInputChange(e, "E1")}
          placeholder="Yeni Değer için E1"
        />
        <br /><br />
        
        <label htmlFor="F1">F1 Hücresine Yeni Değer:</label>
        <input
          id="F1"
          type="text"
          value={inputValues["F1"]}
          onChange={(e) => handleInputChange(e, "F1")}
          placeholder="Yeni Değer için F1"
        />
        <br /><br />
        
        <label htmlFor="G1">G1 Hücresine Yeni Değer:</label>
        <input
          id="G1"
          type="text"
          value={inputValues["G1"]}
          onChange={(e) => handleInputChange(e, "G1")}
          placeholder="Yeni Değer için G1"
        />
        <br /><br />
        
        <label htmlFor="H1">H1 Hücresine Yeni Değer:</label>
        <input
          id="H1"
          type="text"
          value={inputValues["H1"]}
          onChange={(e) => handleInputChange(e, "H1")}
          placeholder="Yeni Değer için H1"
        />
        <br /><br />
        
        <label htmlFor="I1">I1 Hücresine Yeni Değer:</label>
        <input
          id="I1"
          type="text"
          value={inputValues["I1"]}
          onChange={(e) => handleInputChange(e, "I1")}
          placeholder="Yeni Değer için I1"
        />
        <br /><br />
      </div>

      {/* 2 select alanı */}
      <div>
        <label htmlFor="J1">J1 Hücresine Seçim Yapın:</label>
        <select id="J1" value={selectValues["J1"]} onChange={(e) => handleSelectChange(e, "J1")}>
          <option value="">Seçim Yapın</option>
          <option value="Seçenek 1">Seçenek 1</option>
          <option value="Seçenek 2">Seçenek 2</option>
          <option value="Seçenek 3">Seçenek 3</option>
        </select>
        <br /><br />
        
        <label htmlFor="K1">K1 Hücresine Seçim Yapın:</label>
        <select id="K1" value={selectValues["K1"]} onChange={(e) => handleSelectChange(e, "K1")}>
          <option value="">Seçim Yapın</option>
          <option value="Seçenek 1">Seçenek 1</option>
          <option value="Seçenek 2">Seçenek 2</option>
          <option value="Seçenek 3">Seçenek 3</option>
        </select>
        <br /><br />
      </div>

      {/* Güncelleme Butonu */}
      <button onClick={updateExcel} disabled={!file || !selectedSheet}>
        Excel Güncelle & İndir
      </button>
    </div>
  );
};

export default ExcelEditor;
