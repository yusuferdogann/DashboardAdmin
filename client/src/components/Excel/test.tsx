import React, { useState, useEffect } from "react";
import { handleErrorCBAM } from '../../common/utils/helpers'; // Hata gösterme fonksiyonu
import { ToastContainer, toast } from 'react-toastify'; // react-toastify paketini import et
import 'react-toastify/dist/ReactToastify.css'; // Stil dosyasını da import et

const ExcelEditor = () => {
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
  });

  const [inputCount, setInputCount] = useState(1); // Başlangıçta 1 set input gösterilecek

  // Input değerini güncelleme fonksiyonu
  const handleInputChange = (e, cell) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [cell]: e.target.value,
    }));
  };

  // Input ekleme fonksiyonu
  const addInput = () => {
    if (inputCount >= 5) {
      handleErrorCBAM("Daha fazla input ekleyemezsiniz!");
      return;
    }

    // Yeni input ve select için keyler
    const newInputKeyF = `F${56 + inputCount * 3}`; // F56, F59, F62...
    const newInputKeyG = `G${56 + inputCount * 3}`; // G56, G59, G62...
    const newInputKeySelect = `F${57 + inputCount * 3}`; // F57, F60, F63...

    setInputValues((prevValues) => ({
      ...prevValues,
      [newInputKeyF]: "", // Yeni input için boş değer atanır
      [newInputKeyG]: "", // Yeni input için boş değer atanır
      [newInputKeySelect]: "", // Yeni select için boş değer atanır
    }));

    setInputCount(inputCount + 1); // Input sayısını bir artır
  };

  // State değişikliklerini izlemek için useEffect
  useEffect(() => {
    console.log("Güncellenmiş Input Values: ", inputValues);
  }, [inputValues]); // inputValues her değiştiğinde tetiklenir

  return (
    <>
      <div style={{ padding: "20px" }} className="mt-10 border border-slate-300 rounded-sm bg-white shadow-default p-5">
        {/* Doğalgaz Toplam Kullanım Input */}
        <h1 className="text-2xl ms-7 mt-5">Satılan/Üretilen Ürün Ekle</h1>
        <div className="flex justify-start gap-4.5 p-4">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={addInput}
          >
            Urun Ekle
          </button>
        </div>

        <div className="flex flex-wrap gap-4 p-7">
          {/* İlk input ve select, varsayılan olarak ekranda gösterilecek */}
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="F40">Doğalgaz Toplam Kullanım:</label>
            <input
              id="F40"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["F40"]}
              onChange={(e) => handleInputChange(e, "F40")}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="F41">Elektrik Tüketimi:</label>
            <input
              id="F41"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              value={inputValues["F41"]}
              onChange={(e) => handleInputChange(e, "F41")}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="F42">Yakıt Türü:</label>
            <select
              id="F42"
              className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              value={inputValues["F42"]}
              onChange={(e) => handleInputChange(e, "F42")}
            >
              <option value="">Seçiniz</option>
              <option value="dogalgaz">Doğalgaz</option>
              <option value="elektrik">Elektrik</option>
              <option value="kömür">Kömür</option>
            </select>
          </div>
        </div>

        {/* Dinamik olarak eklenen inputlar */}
        {Array.from({ length: inputCount - 1 }).map((_, index) => {
          const newIndex = index + 1;
          const keyF = `F${56 + newIndex * 3}`;
          const keyG = `G${56 + newIndex * 3}`;
          const keySelect = `F${57 + newIndex * 3}`;

          return (
            <div key={newIndex} className="flex flex-wrap gap-4 p-7">
              <div className="flex-1 min-w-[150px]">
                <label htmlFor={keyF}>Doğalgaz Toplam Kullanım:</label>
                <input
                  id={keyF}
                  className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  value={inputValues[keyF]}
                  onChange={(e) => handleInputChange(e, keyF)}
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label htmlFor={keyG}>Elektrik Tüketimi:</label>
                <input
                  id={keyG}
                  className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  value={inputValues[keyG]}
                  onChange={(e) => handleInputChange(e, keyG)}
                />
              </div>

              <div className="flex-1 min-w-[150px]">
                <label htmlFor={keySelect}>Yakıt Türü:</label>
                <select
                  id={keySelect}
                  className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={inputValues[keySelect]}
                  onChange={(e) => handleInputChange(e, keySelect)}
                >
                  <option value="">Seçiniz</option>
                  <option value="dogalgaz">Doğalgaz</option>
                  <option value="elektrik">Elektrik</option>
                  <option value="kömür">Kömür</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </>
  );
};

export default ExcelEditor;
