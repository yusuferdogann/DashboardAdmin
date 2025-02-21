import { useState, useEffect } from 'react';

const YourComponent = () => {
  const facilityInfo = JSON.parse(localStorage.getItem("facilityInformation"));
  const datetime = new Date().toLocaleDateString("tr-TR");

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
    // gasType başlangıçta yok
  });

  const [visibleSelectValue, setVisibleSelectValue] = useState(""); // Görünen select elementinin state'i
  const [hiddenSelectValue, setHiddenSelectValue] = useState(""); // Gizli select elementinin state'i
  const [inputValue, setInputValue] = useState(""); // Input field state'i

  // Görünen select elemanı değiştiğinde savedData güncelleniyor
  useEffect(() => {
    console.log('Visible select changed:', visibleSelectValue);
    setSavedData(prevData => {
      const updatedData = { 
        ...prevData,
        title: visibleSelectValue, // Görünen select'e göre güncelleniyor
      };
      console.log('Updated savedData after visible select change:', updatedData);
      return updatedData;
    });

    // Value 1 seçildiğinde gasType'ı siliyoruz (savedData'dan kaldırıyoruz)
    if (visibleSelectValue === "value1") {
      setSavedData(prevData => {
        const { gasType, ...rest } = prevData; // gasType'ı rest'le ayırıp sadece diğer verileri alıyoruz
        return { ...rest }; // gasType hariç tüm veriyi geri döndürüyoruz
      });
    }

  }, [visibleSelectValue]); // visibleSelectValue değiştiğinde tetiklenir

  // Gizli select elemanı değiştiğinde gasType güncelleniyor
  useEffect(() => {
    console.log('Hidden select changed:', hiddenSelectValue);
    if (visibleSelectValue === "value2") {
      setSavedData(prevData => {
        const updatedData = { 
          ...prevData,
          gasType: hiddenSelectValue, // Gizli select'e göre gasType güncelleniyor
        };
        console.log('Updated savedData after hidden select change:', updatedData);
        return updatedData;
      });
    }
  }, [hiddenSelectValue, visibleSelectValue]); // hiddenSelectValue değiştiğinde tetiklenir ve visibleSelectValue kontrol edilir

  // Input değeri her değiştiğinde miktar güncelleniyor
  useEffect(() => {
    console.log('Input value changed:', inputValue);
    setSavedData(prevData => {
      const updatedData = { 
        ...prevData,
        miktar: inputValue, // Input değeri ile miktar güncelleniyor
      };
      console.log('Updated savedData after input change:', updatedData);
      return updatedData;
    });
  }, [inputValue]); // inputValue değiştiğinde tetiklenir

  return (
    <div>
      {/* Default input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // input değiştiğinde miktarı güncelle
        placeholder="Miktar girin"
      />

      {/* Görünen select */}
      <select 
        value={visibleSelectValue} 
        onChange={(e) => setVisibleSelectValue(e.target.value)}
      >
        {/* Görünen select seçenekleri */}
        <option value="">Seçiniz</option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
      </select>

      {/* Value 2 seçildiğinde gizli select'i açıyoruz */}
      {visibleSelectValue === "value2" && (
        <select 
          value={hiddenSelectValue} 
          onChange={(e) => setHiddenSelectValue(e.target.value)}
        >
          {/* Gizli select seçenekleri */}
          <option value="">Seçiniz</option>
          <option value="gasType1">Gas Type 1</option>
          <option value="gasType2">Gas Type 2</option>
        </select>
      )}

      {/* savedData çıktısını görmek için */}
      
    </div>
  );
};

export default YourComponent;
