// example for react-country-state-dropdown
//  at https://github.com/replaysMike/react-country-state-dropdown
import React, { useState } from "react";
import {
  CountryDropdown,
  StateDropdown,
  CityDropdown,
  LanguageDropdown,
  PhoneInput,
} from "react-country-state-dropdown";

const App = () => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [language, setLanguage] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);
  const handleSetCity = (e, value) => setCity(value);
  const handleSetLanguage = (e, value) => setLanguage(value);
  const handleSetPhone = (e, value) => setPhone(value);

  return (
    <div className="App">
        <span>asd{console.log("ffff",language)}</span>
      <CountryDropdown
        clearable
        searchable
        value={country}
        placeHolder='selam'
        priority={['TR']}
        native='false'
        onChange={handleSetCountry}
      />
      <StateDropdown
        clearable
        searchable
        country={country}
        value={state}
        onChange={handleSetState}
      />
      <CityDropdown
        clearable
        searchable
        allowFreeFormText
        country={country}
        state={state}
        value={city}
        onChange={handleSetCity}
      />
      <LanguageDropdown
        searchable
        clearable
        value={language}
        onChange={handleSetLanguage}
      />
      <PhoneInput clearable value={phone} onChange={handleSetPhone} />
    </div>
  );
};

export default App;
