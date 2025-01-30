import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExcelEditor() {
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
    input9: '',
  });
  const [selects, setSelects] = useState({
    select1: '',
    select2: '',
  });

  // Dosya yükleme işlemi
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const wb = XLSX.read(binaryStr, { type: "binary" });
        setWorkbook(wb);
        const sheetNames = wb.SheetNames;
        if (sheetNames.length > 0) {
          setSelectedSheet(sheetNames[0]);
        }
      };
      reader.readAsBinaryString(file);
      setFile(file);
    }
  };

  // Input ve select değişim işlemleri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelects((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sayfa seçim işlemi
  const handleSheetChange = (e) => {
    setSelectedSheet(e.target.value);
  };

  // Excel güncelleme işlemi
  const updateExcel = () => {
    if (!workbook || !selectedSheet) return;

    // Seçilen sayfayı al
    const ws = workbook.Sheets[selectedSheet];
    
    // Hücre güncellemeleri
    updateCell(ws, "A1", inputs.input1);
    updateCell(ws, "A2", inputs.input2);
    updateCell(ws, "A3", selects.select1);
    updateCell(ws, "A4", selects.select2);

    // Yeni bir kitap oluştur
    const newWorkbook = XLSX.utils.book_new();

    // Tüm sayfaları eski çalışma kitabından yeni çalışmaya kopyala
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      
      // Sayfa adı çakışmasını engellemek için kontrol ekleyelim
      let newSheetName = sheetName;
      let sheetIndex = 1;
      while (newWorkbook.SheetNames.includes(newSheetName)) {
        newSheetName = `${sheetName}_${sheetIndex}`;
        sheetIndex++;
      }
      
      // Yeni sayfayı ekle
      XLSX.utils.book_append_sheet(newWorkbook, sheet, newSheetName);
    });

    // Güncellenmiş sayfayı yeni çalışma kitabına ekle
    XLSX.utils.book_append_sheet(newWorkbook, ws, selectedSheet);

    // Yeni Excel dosyasını oluştur
    const updatedExcel = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });

    // Blob ve dosya indir
    const blob = new Blob([updatedExcel], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated_file.xlsx";
    link.click();
  };

  // Hücre güncelleme işlemi
  const updateCell = (ws, cell, value) => {
    if (!ws[cell]) {
      ws[cell] = {}; // Hücre mevcut değilse, oluştur
    }
    ws[cell].v = value; // Hücre değerini ata
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {workbook && (
        <>
          <label>Sayfa Seç:</label>
          <select value={selectedSheet} onChange={handleSheetChange}>
            {workbook.SheetNames.map((sheetName) => (
              <option key={sheetName} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>
        </>
      )}
      <form>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index}>
            <label>{`Input ${index + 1}`}</label>
            <input
              type="text"
              name={`input${index + 1}`}
              value={inputs[`input${index + 1}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        {["select1", "select2"].map((selectName) => (
          <div key={selectName}>
            <label>{selectName}</label>
            <select name={selectName} value={selects[selectName]} onChange={handleSelectChange}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        ))}
      </form>
      <button onClick={updateExcel}>Excel'i Güncelle ve İndir</button>
    </div>
  );
}

export default ExcelEditor;
