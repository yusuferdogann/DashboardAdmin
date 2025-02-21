import { useState } from "react";

const YourComponent = () => {
  const [savedData, setSavedData] = useState({
    tarih: "19.02.2025",
    title: "",
    subtitle: "",
    kaynak: "",
    birim: "",
    miktar: "",
    ulke: "Türkiye",
    sehir: "Adana",
    ilce: "Adana",
    tesis: "deneme 1",
    situation: "",
  });

  const [formData, setFormData] = useState({
    miktar: "",
    visibleSelect: "",
    hiddenSelect: "",
  });

  // Tüm input ve select değişikliklerini yöneten tek fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      console.log("pdate",updatedFormData)
      // savedData'yı güncelle
      setSavedData((prevData) => {
        let updatedData = { ...prevData };
        console.log("pdate-------------",updatedData)

        // Miktarı güncelle
        if (name === "miktar") updatedData.miktar = value;

        // Görünen select değiştiğinde title güncelleniyor
        if (name === "visibleSelect") updatedData.title = value;

        // Eğer visibleSelect "value2" ise gasType'ı ekle/güncelle, değilse kaldır
        if (updatedFormData.visibleSelect === "value2") {
          updatedData.gasType = updatedFormData.hiddenSelect;
        } else {
          const { gasType, ...rest } = updatedData; // gasType'ı kaldır
          updatedData = rest;
        }

        console.log("Güncellenmiş savedData:", updatedData); // Konsola yazdır
        return updatedData;
      });

      return updatedFormData;
    });
  };

  // Butona tıklandığında savedData'nın son halini console'a yazdır
  const handleSave = () => {
    console.log("🔴 Son Kaydedilen savedData:", savedData);
  };

  return (
    <div>
      {/* Default input */}
      <input
        type="text"
        name="miktar"
        value={formData.miktar}
        onChange={handleChange}
        placeholder="Miktar girin"
      />

      {/* Görünen select */}
      <select name="visibleSelect" value={formData.visibleSelect} onChange={handleChange}>
        <option value="">Seçiniz</option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
      </select>

      {/* Value 2 seçildiğinde gizli select göster */}
      {formData.visibleSelect === "value2" && (
        <select name="hiddenSelect" value={formData.hiddenSelect} onChange={handleChange}>
          <option value="">Seçiniz</option>
          <option value="gasType1">Gas Type 1</option>
          <option value="gasType2">Gas Type 2</option>
        </select>
      )}

      {/* Kaydet Butonu */}
      <button onClick={handleSave} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Kaydet ve Konsola Yazdır
      </button>
    </div>
  );
};

export default YourComponent;
