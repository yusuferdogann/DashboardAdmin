import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr"; // Türkçe dil dosyasını import et


const ExcelEditor = () => {
  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]); // Sayfa isimleri
  const [selectedSheet, setSelectedSheet] = useState(""); // Seçilen sayfa
  const [inputValues, setInputValues] = useState({
    F40: "",
    G40: "",
    F46: "",
    H46: "",
    D49: "",
    D50: "",
    E49: "",
    E50: "",
    F52: "",
  }); // 9 input için değerler
  const [selectValues, setSelectValues] = useState({
    I9: null,
    L9: null,
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

      // Sadece 4. sayfayı göster
      const sheetNames = workbook.SheetNames.slice(4, 5); // Dördüncü sayfayı seç
      setSheetNames(sheetNames);
      setSelectedSheet(workbook.SheetNames[4]); // İlk sayfayı seçili yap
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
            const excelCell = sheet.getCell(cell); // Hücreyi al
        
            if (excelCell.formula) {
              // Hücrede formül varsa, sadece biçimlendirme uygula
              excelCell.font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
              excelCell.alignment = { vertical: "middle", horizontal: "center" }; // Orta hizalama
            } else if (value instanceof Date && !isNaN(value)) {
              // Eğer hücre formül içermiyorsa ve tarihse
              const dateObj = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = String(dateObj.getMonth() + 1).padStart(2, "0");
              const year = dateObj.getFullYear();
              const formattedDate = `${day}/${month}/${year}`;
        
              excelCell.value = formattedDate; // Excel'e tarih formatında yaz
              excelCell.font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
              excelCell.alignment = { vertical: "middle", horizontal: "center" }; // Orta hizalama
            } else {
              // Normal değer ataması
              excelCell.value = value;
            }
          }
        });
        

        // Select değerleriyle hücreleri güncelle
        Object.keys(selectValues).forEach((cell) => {
          const value = selectValues[cell];
          if (value) {
            const excelCell = sheet.getCell(cell);
            // Tarihi dd/mm/yyyy formatında yazdır
            const dateObj = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Aylar 0-11 arası olduğu için +1 ekliyoruz
            const year = dateObj.getFullYear();
            const formattedDate = `${day}/${month}/${year}`; // dd/mm/yyyy formatı


            excelCell.value = formattedDate; // Excel doğru tarihi görür
            excelCell.font = { bold: true, color: { argb: "0000FF" } }; // Mavi ve kalın yap
            excelCell.alignment = { vertical: "middle", horizontal: "center" }; // Orta hizalama
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
        const updatedBlob = new Blob([updatedBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // Dosyayı hemen indir ve aç
        const fileUrl = URL.createObjectURL(updatedBlob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = "guncellenmis_dosya.xlsx";
        link.click();
        URL.revokeObjectURL(fileUrl);
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

  // DatePicker değeri değiştiğinde state'i güncelleme
  const handleDateChange = (date, cell) => {
    setSelectValues({
      ...selectValues,
      [cell]: date,
    });
  };

  return (
    <div style={{ padding: "20px" }} className="mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
      {/* <h2>Excel Düzenleyici</h2> */}

      {/* Dosya Yükleme */}
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <br /><br />

      {/* Kullanıcıdan Sayfa Seçmesini İste */}
      {sheetNames.length > 0 && (
        <>
          <label htmlFor="sheet-select">Sayfa Seç:</label>
          <select  className='ms-4 w-full rounded border ms-4 border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary' id="sheet-select" value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)} style={{width:"8%"}}>
            {sheetNames.map((sheet) => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
          <br /><br />
        </>
      )}
      {/* 2 DatePicker alanı */}
      <div className="flex p-7 items-center border-b  border-stroke py-4  dark:border-strokedark">
        <label htmlFor="J1" >Rapor Başlangıç Tarihi:</label>
        <DatePicker
          selected={selectValues["I9"]}
          onChange={(date) => handleDateChange(date, "I9")}
          dateFormat="dd/MM/yyyy"
          className="w-full rounded border ms-4 border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          locale={tr}

        />


        <label htmlFor="L9" className="ms-7">Rapor Bitiş Tarihi:</label>
        <DatePicker
          selected={selectValues["L9"]}
          onChange={(date) => handleDateChange(date, "L9")}
          dateFormat="dd/MM/yyyy"
          className="w-full rounded ms-4 border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          locale={tr}

        />

      </div>

      <div className="p-7 flex grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 " >


        {/* 9 input alanı */}


        <div className="sm:w-1/2 py-3">
          <label htmlFor="F40">Doğalgaz Toplam Kullanım:</label>
          <input
            id="F40"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            value={inputValues["F40"]}
            onChange={(e) => handleInputChange(e, "F40")}
          />
        </div>

        <div className="sm:w-1/2 py-3">
          <label htmlFor="G40">Üreim Yüzdesi(Doğalgaz):</label>
          <input
            id="G40"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["G40"]}
            onChange={(e) => handleInputChange(e, "G40")}
          />
          <br />
        </div>

        <div className="sm:w-1/2 py-3">
          <label htmlFor="F46">Üretim Yüzdesi(Elektrik):</label>
          <input
            id="F46"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["F46"]}
            onChange={(e) => handleInputChange(e, "F46")}
          />
        </div>

        <div className="sm:w-1/2 py-3">
          <label htmlFor="H46">Toplam Elektrik Kullanımı:</label>
          <input
            id="H46"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["H46"]}
            onChange={(e) => handleInputChange(e, "H46")}
          />
        </div>


        <div className="sm:w-1/2 py-3">
          <label htmlFor="D49">üretilen 1.Ürün:</label>
          <input
            id="D49"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["D49"]}
            onChange={(e) => handleInputChange(e, "D49")}
          />
        </div>

        <div className="sm:w-1/2 py-3">
          <label htmlFor="D50">üretilen 2.Ürün:</label>
          <input
            id="D50"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["D50"]}
            onChange={(e) => handleInputChange(e, "D50")}
          />
        </div>


        <div className="sm:w-1/2 py-3">
          <label htmlFor="E49">Satılan 1.Ürün:</label>
          <input
            id="E49"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["E49"]}
            onChange={(e) => handleInputChange(e, "E49")}
          />
        </div>


        <div className="sm:w-1/2 py-3">
          <label htmlFor="E50">Satılan 2.Ürün:</label>
          <input
            id="E50"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["E50"]}
            onChange={(e) => handleInputChange(e, "E50")}
          />
        </div>

        <div className="sm:w-1/2 py-3">
          <label htmlFor="F52">Elekrık Em:</label>
          <input
            id="F52"
            type="text"
            className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            value={inputValues["F52"]}
            onChange={(e) => handleInputChange(e, "F52")}
          />
        </div>



      </div>

      {/* Güncelleme Butonu */}
      {/* <button onClick={updateExcel} disabled={!file || !selectedSheet}>
        Excel Güncelle & İndir
      </button> */}

      <div className="flex justify-end gap-4.5 p-4">
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          onClick={updateExcel} disabled={!file || !selectedSheet}
        >
          Excel Guncelle & Indir
        </button>
      </div>
    </div>
  );
};

export default ExcelEditor;
