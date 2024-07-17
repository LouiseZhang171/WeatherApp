import React, { useState } from 'react';
import CityAutocomplete from './CityAutocomplete';
import './App.css'; 

const Search = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() && country.trim()) {
      onSearch(location, country);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CityAutocomplete onCitySelect={setLocation} onCountrySelect={setCountry} />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
