import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelEditor() {
  const [excelData, setExcelData] = useState(null);
  const [sheetName, setSheetName] = useState('');
  
  // Hücre verileri, kullanıcı manuel olarak girecek
  const [cellValues, setCellValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
    input9: '',
    select1: '',
    select2: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetNames = workbook.SheetNames;
      setSheetName(sheetNames[0]);  // İlk sayfayı seçelim (isteğe göre değiştirebilirsiniz)
      setExcelData(workbook);
    };
    reader.readAsBinaryString(file);
  };

  const handleSheetChange = (e) => {
    setSheetName(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCellValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const updateExcel = () => {
    if (excelData && sheetName) {
      const sheet = excelData.Sheets[sheetName];

      const cellMappings = [
        { input: 'input1', cell: 'H65' },
        { input: 'input2', cell: 'A2' },
        { input: 'input3', cell: 'A3' },
        { input: 'input4', cell: 'A4' },
        { input: 'input5', cell: 'A5' },
        { input: 'input6', cell: 'A6' },
        { input: 'input7', cell: 'A7' },
        { input: 'input8', cell: 'A8' },
        { input: 'input9', cell: 'A9' },
        { input: 'select1', cell: 'B1' },
        { input: 'select2', cell: 'B2' }
      ];

      // Verileri ve stilleri koruyarak güncelleme
      cellMappings.forEach(({ input, cell }) => {
        const value = cellValues[input];
        if (sheet[cell]) {
          // Veriyi güncelle
          sheet[cell].v = value;

          // Stil ve formatları koru (sheet[cell].s)
          if (sheet[cell].s) {
            const style = sheet[cell].s;
            sheet[cell].s = style; // Stil bilgisini koru
          }
        }
      });

      // Excel dosyasını yeniden yaz
      const wbout = XLSX.write(excelData, { bookType: 'xlsx', type: 'binary', bookSST: false });
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'updated_file.xlsx';
      link.click();
    }
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  return (
    <div>
      <h1>Excel Düzenleyici</h1>

      {/* Excel dosyası yükleme */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {/* Sayfa Seçimi */}
      {excelData && (
        <div>
          <label>Sayfa Seçin:</label>
          <select value={sheetName} onChange={handleSheetChange}>
            {excelData.SheetNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 9 Input */}
      <div>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={`input-${index + 1}`}>
            <label>Input {index + 1}:</label>
            <input
              type="text"
              name={`input${index + 1}`}
              value={cellValues[`input${index + 1}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>

      {/* 2 Select */}
      <div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`select-${index + 1}`}>
            <label>Select {index + 1}:</label>
            <select
              name={`select${index + 1}`}
              value={cellValues[`select${index + 1}`]}
              onChange={handleInputChange}
            >
              <option value="">Select Option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        ))}
      </div>

      {/* Excel Güncelleme Butonu */}
      <button onClick={updateExcel}>Excel'i Güncelle ve İndir</button>
    </div>
  );
}

export default ExcelEditor;
