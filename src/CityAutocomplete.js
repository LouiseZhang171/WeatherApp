import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const GeoNamesUsername = 'louisezhang';

const CityAutocomplete = ({ onCitySelect, onCountrySelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCities = async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const isZipCode = /^\d+$/.test(query); // 判断是否为邮政编码
      const params = {
        maxRows: 10,
        username: GeoNamesUsername,
        ...(isZipCode ? { postalcode: query } : { placename: query })
      };

      try {
        const response = await axios.get('https://secure.geonames.org/postalCodeSearchJSON', { params });
        const cities = response.data.postalCodes
          .filter(city => isZipCode || city.placeName.toLowerCase().startsWith(query.toLowerCase())) // 过滤结果
          .map(city => ({
            name: city.placeName,
            country: city.countryCode
          }));

        // 去除重复的城市名称
        const uniqueCities = cities.filter((city, index, self) =>
          index === self.findIndex((c) => (
            c.name === city.name && c.country === city.country
          ))
        );
        setSuggestions(uniqueCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    if (inputValue.length > 0) {
      fetchCities(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city.name);
    onCitySelect(city.name);
    onCountrySelect(city.country);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter city or postal code"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              {city.name} ({city.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
