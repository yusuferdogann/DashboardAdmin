import React, { useState } from "react";

const energyOptions = [
  { id: "dogalgaz", name: "Doğalgaz" },
  { id: "elektrik", name: "Elektrik" },
  { id: "kömür", name: "Kömür" },
  { id: "güneş", name: "Güneş Enerjisi" },
  { id: "rüzgar", name: "Rüzgar Enerjisi" },
  { id: "hidro", name: "Hidroelektrik" },
  { id: "biyokütle", name: "Biyokütle" },
  { id: "jeotermal", name: "Jeotermal" },
  { id: "nükleer", name: "Nükleer Enerji" },
  { id: "petrol", name: "Petrol" }
];


const SearchableSelect = ({ id, inputValues, handleInputChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const filteredOptions = energyOptions.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-2 text-black"
        />
        <select
          id={id}
          className="w-full rounded border border-stroke bg-gray py-1 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          value={inputValues[id] || ""}
          onChange={(e) => handleInputChange(e, id)}
        >
          <option value="">Seçiniz</option>
          {filteredOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SearchableSelect;
  

