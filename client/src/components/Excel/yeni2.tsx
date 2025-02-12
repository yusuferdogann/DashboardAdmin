import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr"; // Türkçe dil dosyasını import et
import { Dialog, DialogBody, DialogFooter, Button, Checkbox, DialogHeader, Card } from "@material-tailwind/react";
import { handleErrorCBAM } from '../../common/utils/helpers';
import { userAuth } from "../../auth/userAuth"
import { toast } from "react-toastify";
import { get, post } from "../../server/Apiendpoint";




const ExcelEditor = () => {

  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]); // Sayfa isimleri
  const [selectedSheet, setSelectedSheet] = useState(""); // Seçilen sayfa
  // const [workbook, setWorkbook] = useState(null); // Excel çalışma kitabı (workbook)
  // const [wb, setWb] = useState(null); // Excel çalışma kitabı (wb) durumu
  const [wb, setWorkbook] = useState(null); // Workbook state'i
    const { token} = userAuth();

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputCount, setInputCount] = useState(1); // Başlangıçta 1 set input gösterilecek
  const [loading, setLoading] = useState(false); // Spinner kontrolü için state
  const [isHovered, setIsHovered] = useState(false);
  const [reportBalence,setReportBalance] =useState()
  const facilityInfo = JSON.parse(localStorage.getItem('facilityInformation'))
  const userDetail = JSON.parse(localStorage.getItem('detail'))
  // setReportBalance(userDetail?.reportLimit)
  console.log("facility--------",facilityInfo)
  // 9 input için değerler
  const [inputValues, setInputValues] = useState({
    H18:facilityInfo?.facilityname,
    H20:facilityInfo?.FieldActivity,
    H23:facilityInfo?.city,
    H24:facilityInfo?.country,
    H25:facilityInfo?.CityCode,
    H26:facilityInfo?.latitude,
    H27:facilityInfo?.longitude,
    F40: "",
    G49: "",
    H49: "",
    H46: "",
    C57: "",
    F59: "",
    D57: "",
    E49: "",
    F49: "",
    I49: "",
   
   
    
    
   
   

  }); 

  // 2 select için değerler
  const [selectValues, setSelectValues] = useState({
    I9: null,
    L9: null,
  }); 

      // ✅ HÜCRE BAŞLIKLARINI HARİTALAMA
      const cellMappings = {
        "F40": "Doğalgaz Toplam Kullanım(ton)", //+
        "G49": "Alınan Hammadde(ton)",//+
        "H49": "Kullanılan Hammadde(ton)", //+
        "H46": "Toplam Elektrik Kullanımı(kW)", //+
        "C57": "Hammadde Doğrudan Emisyonları(tCO2e/t)",//+
        "F59": "Elektrik Emisyon Değeri(0.442):",
        "D57": "Hammadde Dolaylı Emisyonları(tCO2e/t):"//+
      };

  useEffect(() => {
    if (wb) {
      console.log("Workbook güncellendi:", wb); // wb güncellendikçe burası tetiklenir
    }
  }, [wb]); // wb değiştiğinde çalışacak

  const addInput = () => {
    if (inputCount >= 5){
      handleErrorCBAM("Daha fazla input ekleyemezsiniz!");
      return; // Maksimum 5 set (toplam 15 input) olmasını sağlıyoruz
    }
  
    setInputCount((prevCount) => prevCount + 1);
    
    const newIndex = inputCount; // 1'den başlayarak artıyor
    const newInputKeyF = `E${49 + newIndex}`; // E49, E50, E51...
    const newInputKeyG = `F${49 + newIndex}`; // F49, F50, F51...
    const newInputKeySelect = `I${49 + newIndex}`; // I49, I50, I51...
  
    setInputValues((prev) => ({
      ...prev,
      [newInputKeyF]: "",
      [newInputKeyG]: "",
      [newInputKeySelect]: "",
    }));
  };
 
  //  -------------------------------ESKI YAPI-------------------------------------
  // const fetchExcelData = async () => {
  //   setLoading(true);
  
  //   try {
  //     const fileId = "1qFBsqGxy0M-G1R2-0TUUaEc7mEolS9yv"; // Google Sheets ID
  //     const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
  //     const response = await fetch(url);
  
  //     if (!response.ok) {
  //       throw new Error("Excel dosyası alınırken hata oluştu!");
  //     }
  
  //     const bufferArray = await response.arrayBuffer();
  //     const wb = new ExcelJS.Workbook();
  //     await wb.xlsx.load(bufferArray);
  
  //     const sheet = wb.getWorksheet("Veri_Girisi");
  //     if (!sheet) {
  //       toast.error('"Veri_Girisi" sayfası bulunamadı.');
  //       return;
  //     }
  
  //     setWorkbook(wb); // Workbook'u state'e set et
  //     setLoading(false);
  //     toast.success("Excel başarıyla alındı!");
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Excel yüklenirken hata oluştu!");
  //     console.error("Yükleme hatası:", error);
  //   }
  // };
  
  const fetchExcelData = async () => {
    setLoading(true);
    console.log("Excel dosyası alınıyor...");
    
    try {
      const fileId = "1E17l81o5bYENLSKKLasR3ErsTkkwXUNh"; // Google Sheets ID
      const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Excel dosyası alınırken hata oluştu!");
      }
      console.log("Excel dosyası başarıyla alındı.");
  
      const bufferArray = await response.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(bufferArray);
      console.log("Excel workbook başarıyla yüklendi.");
  
      // Sayfa kontrolü
      const sheet = wb.getWorksheet("Veri_Girisi");
      if (!sheet) {
        toast.error('"Veri_Girisi" sayfası bulunamadı.');
        console.log('"Veri_Girisi" sayfası bulunamadı!');
        return;
      }
      console.log('"Veri_Girisi" sayfası başarıyla bulundu.');
  
      setWorkbook(wb); // Workbook'u state'e set et
      setLoading(false);
      toast.success("Excel başarıyla alındı!");
    } catch (error) {
      setLoading(false);
      toast.error("Excel yüklenirken hata oluştu!");
      console.error("Yükleme hatası:", error);
    }
  };
  
  
  // File dosysinin Export edilip edilmedigini kontrol eden fonksiyon
  const CheckImport = async () => {
    const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer: " +token
      }
  };
    const response = await get('/getReportLimit', config);
    if(response?.data?.reportLimit<= 0){
    toast.warning("Limit doldu!");
    setOpen(null);


    }else{
      console.log("CheckImport - Workbook state:", wb); // Burada wb'nin güncel değeri kontrol edilir
      if (!wb) {
        toast.error("Önce Excel dosyasını yükleyin!");
        setOpen(null);

        return;
      }
      else{  setOpen(true) }
    }


 
  
};

  
  // Excel dosyasını seçilen sayfada güncelleme ve şifreleme fonksiyonu
 const updateExcel = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer: " + token
    }
  };

  try {
    if (!wb) {
      toast.error("Lütfen önce bir Excel dosyası yükleyin!");
      console.error("wb bulunamadı!");
      return;
    }

    console.log("Excel dosyası alındı. İşlem başlatılıyor...");

    const sheet = wb.getWorksheet("Veri_Girisi");
    if (!sheet) {
      toast.error('"Veri_Girisi" sayfası bulunamadı.');
      console.error('"Veri_Girisi" sayfası bulunamadı!');
      return;
    }

    console.log('"Veri_Girisi" sayfası başarıyla bulundu.');

    // ✅ SABİT INPUTLARIN GÜNCELLENMESİ
    Object.keys(inputValues).forEach((key) => {
      const cell = sheet.getCell(key);
      cell.value = inputValues[key];
      console.log(`Hücre: ${key}, Değer: ${inputValues[key]}`);
    });

    // ✅ SELECT DEĞERLERİNİ GÜNCELLEME
    Object.keys(selectValues).forEach((key) => {
      const cell = sheet.getCell(key);
      cell.value = selectValues[key];
      console.log(`Hücre: ${key}, Seçili Değer: ${selectValues[key]}`);
    });

    // 🟢 GÜNCELLENEN EXCEL'İ BUFFER'A YAZDIR
    const buffer = await wb.xlsx.writeBuffer();
    console.log("Excel buffer yazıldı:", buffer);

    // ✅ EXCEL DOSYASINI İNDİR
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Guncellenmis_Veriler.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await post('/checkBalanceReport', {}, config);

    // ✅ INPUT VE DATEPICKER VERİLERİNİ SIFIRLAMA (DOĞRU YÖNTEM)
    setInputValues((prev) => {
      const clearedInputs = {};
      Object.keys(prev).forEach((key) => {
        clearedInputs[key] = ""; // Tüm inputları boş string yap
      });
      return clearedInputs;
    });

    setSelectValues({}); // DatePicker'ları sıfırla

    toast.success("Excel başarıyla güncellendi ve indirildi!");
    setOpen(null); // Modalı en son kapat

  } catch (error) {
    console.error("Excel güncelleme hatası:", error);
    toast.error("Excel güncellenirken hata oluştu!");
  }
};

// very-hidden ozellikli------------------------------
// const updateExcel = async () => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer: " + token
//     }
//   };

//   try {
//     if (!wb) {
//       toast.error("Lütfen önce bir Excel dosyası yükleyin!");
//       console.error("wb bulunamadı!");
//       return;
//     }

//     console.log("Excel dosyası alındı. İşlem başlatılıyor...");

//     const sheet = wb.getWorksheet("Veri_Girisi");
//     if (!sheet) {
//       toast.error('"Veri_Girisi" sayfası bulunamadı.');
//       console.error('"Veri_Girisi" sayfası bulunamadı!');
//       return;
//     }

//     console.log('"Veri_Girisi" sayfası başarıyla bulundu.');

//     // ✅ SABİT INPUTLARIN GÜNCELLENMESİ
//     Object.keys(inputValues).forEach((key) => {
//       const cell = sheet.getCell(key);
//       cell.value = inputValues[key];
//       console.log(`Hücre: ${key}, Değer: ${inputValues[key]}`);
//     });

//     // ✅ SELECT DEĞERLERİNİ GÜNCELLEME
//     Object.keys(selectValues).forEach((key) => {
//       const cell = sheet.getCell(key);
//       cell.value = selectValues[key];
//       console.log(`Hücre: ${key}, Seçili Değer: ${selectValues[key]}`);
//     });

//     // 🟢 "Veri_Girisi" Sayfasını "Very Hidden" Yap (Gizliliği sağla)
//     sheet.state = "veryHidden"; // Sayfayı gizle
//     console.log('"Veri_Girisi" sayfası veryHidden olarak ayarlandı.');

//     // 🟢 GÜNCELLENEN EXCEL'İ BUFFER'A YAZDIR
//     const buffer = await wb.xlsx.writeBuffer();
//     console.log("Excel buffer yazıldı:", buffer);

//     // ✅ EXCEL DOSYASINI İNDİR
//     const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Guncellenmis_Veriler.xlsx";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     await post('/checkBalanceReport', {}, config);

//     // ✅ INPUT VE DATEPICKER VERİLERİNİ SIFIRLAMA
//     setInputValues((prev) => {
//       const clearedInputs = {};
//       Object.keys(prev).forEach((key) => {
//         clearedInputs[key] = ""; // Tüm inputları boş string yap
//       });
//       return clearedInputs;
//     });

//     setSelectValues({}); // DatePicker'ları sıfırla

//     toast.success("Excel başarıyla güncellendi ve indirildi!");
//     setOpen(null); // Modalı en son kapat

//   } catch (error) {
//     console.error("Excel güncelleme hatası:", error);
//     toast.error("Excel güncellenirken hata oluştu!");
//   }
// };

  
  

  

  // Input değeri değiştiğinde state'i güncelleme
  const handleInputChange = (e, cell) => {
    setInputValues({
      ...inputValues,
      [cell]: e.target.value,
    });
    console.log("yenisayfasi-------", inputValues)
  };

  // DatePicker değeri değiştiğinde state'i güncelleme
  const handleDateChange = (date, cell) => {
    if (!date) return;
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0); // Gün değişmesini önlemek için saat 12 yap
    setSelectValues({
      ...selectValues,
      [cell]: adjustedDate,
    });
  };

 
  useEffect(() => {
      console.log("Güncellenmiş Input Values: ", inputValues);
    }, [inputValues]); // inputValues her değiştiğinde tetiklenir
  
  return (
    <>
    <div style={{ padding: "20px" }} className="mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
        {/* <h2>Excel Düzenleyici</h2> */}

        {/* Dosya Yükleme */}
        {/* <input type="file" accept=".xlsx" onChange={handleFileUpload} /> */}
        {/* 📌 Excel Yükle Butonu */}
        <button
          onClick={fetchExcelData}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Excel Yükle"}
        </button>
        <br /><br />

        {/* Kullanıcıdan Sayfa Seçmesini İste */}
        {sheetNames.length > 0 && (
          <>
            <label htmlFor="sheet-select">Sayfa Seç:</label>
            <select className='ms-4 w-full rounded border ms-4 border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary' id="sheet-select" value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)} style={{ width: "8%" }}>
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

        <div className="p-7 flex grid grid-cols-1  md:grid-cols-2  xl:grid-cols-2  border-b  border-stroke py-4  dark:border-strokedark" >
          {/* 9 input alanı */}
          <div className="sm:w-1/2 py-3">
            <label htmlFor="F40">Doğalgaz Toplam Kullanım(ton):</label>
            <input
              id="F40"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["F40"]}
              onChange={(e) => handleInputChange(e, "F40")}
            />
          </div>

          <div className="sm:w-1/2 py-3">
            <label htmlFor="G49">Alınan Hammadde(ton):</label>
            <input
              id="G49"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["G49"]}
              onChange={(e) => handleInputChange(e, "G49")}
            />
            <br />
          </div>

          <div className="sm:w-1/2 py-3">
            <label htmlFor="H49">Kullanılan Hammadde(ton):</label>
            <input
              id="H49"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["H49"]}
              onChange={(e) => handleInputChange(e, "H49")}
            />
          </div>

          <div className="sm:w-1/2 py-3">
            <label htmlFor="H46">Toplam Elektrik Kullanımı(kW):</label>
            <input
              id="H46"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["H46"]}
              onChange={(e) => handleInputChange(e, "H46")}
            />
          </div>

          <div className="sm:w-1/2 py-3">
            <label htmlFor="C57">Hammadde Doğrudan Emisyonları(tCO2e/t):</label>
            <input
              id="C57"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["C57"]}
              onChange={(e) => handleInputChange(e, "C57")}
            />
          </div>
          <div className="sm:w-1/2 py-3">
            <label htmlFor="D57">Hammadde Dolaylı Emisyonları(tCO2e/t):</label>
            <input
              id="D57"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["D57"]}
              onChange={(e) => handleInputChange(e, "D57")}
            />
          </div>

          <div className="sm:w-1/2 py-3">
            <label htmlFor="F59">Elektrik Emisyon Değeri(0.442):</label>
            <input
              id="F59"
              type="text"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["F59"]}
              onChange={(e) => handleInputChange(e, "F59")}
            />
          </div>



        </div>
        {/* <hr /> */}
        <h1 className="text-2xl ms-7 mt-5">Satılan/Üretilen Ürün Ekle</h1>
        <div className="flex justify-start gap-4.5 p-3">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={addInput}

          >
            Urun Ekle
          </button>
        </div>
        <div className="flex flex-wrap gap-4 p-3">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="E49">Üretilen 1.Ürün(ton):</label>
            <input
              id="E49"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["E49"]}
              onChange={(e) => handleInputChange(e, "E49")}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="F49">Satılan 1.Ürün(ton):</label>
            <input
              id="F49"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["F49"]}
              onChange={(e) => handleInputChange(e, "F49")}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="I49">CN Kod:</label>
            <input
              id="I49"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["I49"]}
              onChange={(e) => handleInputChange(e, "I49")}
            />
          </div>
        </div>
          {/* Dinamik olarak eklenen inputlar */}
          {Array.from({ length: inputCount - 1 }).map((_, index) => {
  const newIndex = index + 1;
  const keyF = `E${49 + newIndex}`; // E49, E50, E51...
  const keyG = `F${49 + newIndex}`; // F49, F50, F51...
  const keySelect = `I${49 + newIndex}`; // I49, I50, I51...

  return (
    <div key={newIndex} className="flex flex-wrap gap-4 p-3">
      <div className="flex-1 min-w-[150px]">
        <label htmlFor={keyF}>Üretilen {newIndex + 1} Ürün(ton):</label>
        <input
          id={keyF}
          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          value={inputValues[keyF]}
          onChange={(e) => handleInputChange(e, keyF)}
        />
      </div>

      <div className="flex-1 min-w-[150px]">
        <label htmlFor={keyG}>Satılan {newIndex + 1} Ürün(ton):</label>
        <input
          id={keyG}
          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          value={inputValues[keyG]}
          onChange={(e) => handleInputChange(e, keyG)}
        />
      </div>

      <div className="flex-1 min-w-[150px]">
        <label htmlFor={keySelect}>CN Kod:</label>
        <input
          id={keySelect}
          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="text"
          value={inputValues[keySelect]}
          onChange={(e) => handleInputChange(e, keySelect)}
        />
      </div>
    </div>
  );
})}

      

        <div className="flex justify-end gap-4.5 p-4">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={CheckImport}

          >
            {loading ? (
              <div className="spinner-border flex items-center " role="status">
                <span className="me-4">Yükleniyor...</span>
                <svg aria-hidden="true" className="selam w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>

              </div>
            ) : (
              "Excel Guncelle & Indir"
            )}
          </button>
        </div>
    </div>
    <Dialog
  open={open}
  handler={() => setOpen(!open)}
  className="max-w-2xl mx-auto max-h-screen overflow-y-auto bg-gray-100 font-sans text-base leading-6 font-normal"
>
  <DialogBody className="max-h-[80vh] overflow-y-auto bg-gray-100 font-sans text-base leading-6 font-normal">
    <DialogHeader className="justify-center flex">Raporu Onayla</DialogHeader>

    <div className="flex flex-col gap-2">
      {Object.keys(inputValues)
        .filter((key) => cellMappings[key])
        .map((key) => (
          <div
            key={key}
            className="flex justify-between border-b border-stroke pb-1 bg-gray-100 font-sans text-base leading-6 font-normal"
          >
            <span className="font-semibold text-gray-700">{cellMappings[key]}</span>
            <span className="text-gray-900">{inputValues[key]}</span>
          </div>
        ))}
    </div>

    <table className="w-full mt-4 border border-stroke bg-gray-100 font-sans text-base leading-6 font-normal">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-semibold">
          <th className="border border-stroke p-2">ID</th>
          <th className="border border-stroke p-2">Üretilen Ürün</th>
          <th className="border border-stroke p-2">Satılan Ürün</th>
          <th className="border border-stroke p-2">CN Kod</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-stroke p-2">1</td>
          <td className="border border-stroke p-2">{inputValues["E49"]}</td>
          <td className="border border-stroke p-2">{inputValues["F49"]}</td>
          <td className="border border-stroke p-2">{inputValues["I49"]}</td>
        </tr>
        {Array.from({ length: inputCount - 1 }).map((_, index) => {
          const newIndex = index + 1;
          const keyF = `E${49 + newIndex}`;
          const keyG = `F${49 + newIndex}`;
          const keySelect = `I${49 + newIndex}`;
          return (
            <tr key={newIndex}>
              <td className="border border-stroke p-2">{newIndex + 1}</td>
              <td className="border border-stroke p-2">{inputValues[keyF]}</td>
              <td className="border border-stroke p-2">{inputValues[keyG]}</td>
              <td className="border border-stroke p-2">{inputValues[keySelect]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <label className="flex items-center mt-4 bg-gray-100 font-sans text-base leading-6 font-normal">
      <Checkbox
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className="mr-2"
      />
      <small>
        <b>Ön Bilgilendirme Koşullarını</b> ve <b>Sözleşme</b>'yi okudum, Onaylıyorum.
      </small>
    </label>

    <div className="w-full h-[180px] bg-white border border-[#e2e8f0] rounded-[20px] overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 font-sans text-base leading-6 font-normal">
      <div className="p-4 h-[600px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iusto eaque, laboriosam laborum enim rerum similique ad...
      </div>
    </div>
  </DialogBody>
  <DialogFooter className="bg-gray-100 font-sans text-base leading-6 font-normal">
    <Button onClick={() => setOpen(false)} className="mr-2" color="red">
      İptal
    </Button>
    <Button onClick={updateExcel} disabled={!isChecked} color="green">
      İndir
    </Button>
  </DialogFooter>
</Dialog>



    </>
  );
};

export default ExcelEditor;
