import React, { useState } from "react";
import { CountryDropdown } from "react-country-state-dropdown";

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState("");

  // Ülke değişimini yönetiyoruz
  const handleCountryChange = (event) => {
    const countryName = event.target.dataset.label; // Ülkenin adı (örneğin: Turkey)
    const countryCode = event.target.dataset.iso2; // Ülkenin ISO2 kodu (örneğin: TR)

    if (countryName && countryCode) {
      const formattedValue = `${countryName} (${countryCode})`; // "Turkey (TR)" formatında göster
      console.log("Seçilen Ülke: ", formattedValue);
      setSelectedCountry(formattedValue);
    }
  };

  return (
    <div>
      <label htmlFor="country">Ülke Seçin:</label>
      <CountryDropdown
        value={selectedCountry} // Seçilen ülke burada gösterilecek
        onChange={handleCountryChange} // Seçim yapıldığında handleCountryChange çalışacak
        className="border rounded p-2 w-full dropdown"
        id="country"
        clearable
        searchable
        native={false} // Bayrakları göster
        customOption={(country) => (
          <div
            data-label={country.label} // Ülke ismi (Turkey, Germany vb.)
            data-iso2={country.iso2} // Ülke kodu (TR, DE vb.)
            className="flex items-center gap-2"
          >
            <img
              src={`https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png`} // Bayrak URL
              alt={country.label}
              className="w-5 h-3"
            />
            {country.label} ({country.iso2}) {/* Turkey (TR) formatında göster */}
          </div>
        )}
        customSelected={(country) =>
          country ? `${country.label} (${country.iso2})` : "Ülke Seçin"
        } // Seçilen değeri "Turkey (TR)" formatında göster
      />
      <p>Seçilen Ülke: {selectedCountry}</p>
    </div>
  );
}
