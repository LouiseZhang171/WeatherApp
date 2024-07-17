import React, { useState } from 'react';
import { fetchWeather } from './weatherApi';
import Search from './Search';
import Header from './Header';
import Footer from './Footer';
import './App.css'; 

const App = () => {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (location, country) => {
    try {
      const data = await fetchWeather(location, country);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getWeatherClass = () => {
    if (!weather) return 'default';
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'sunny';
    if (main.includes('clouds')) return 'cloudy';
    if (main.includes('rain')) return 'rainy';
    return 'default';
  };

  const getWeatherIconClass = (main) => {
    switch (main) {
      case 'clear':
        return 'wi wi-day-sunny'; // Weather Icons classes
      case 'clouds':
        return 'wi wi-cloudy';
      case 'rain':
        return 'wi wi-rain';
      default:
        return 'wi wi-na';
    }
  };

  return (
    <div className={`app ${getWeatherClass()}`}>
      <Header />
      <main>
        <h1>Check the Weather</h1>
        <p className="tagline">Get the latest weather updates for any location.</p>
        <Search onSearch={handleSearch} />
        {weather && (
          <div className={`weather-info ${getWeatherClass()}`}>
            <h2>{weather.name}</h2>
            <p className="description">{weather.weather[0].description}</p>
            <i className={`weather-icon ${getWeatherIconClass(weather.weather[0].main.toLowerCase())}`}></i>
            <div className="details-container">
              <div className="details">
                <div className="details-item"><span className="label">Feels like:</span><span className="value">{Math.round(weather.main.feels_like)}°C</span></div>
                <div className="details-item"><span className="label">Wind:</span><span className="value">{weather.wind.speed} m/s</span></div>
                <div className="details-item"><span className="label">Humidity:</span><span className="value">{weather.main.humidity}%</span></div>
              </div>
              <div className="temperature" style={{ marginLeft: 'auto' }}>{Math.round(weather.main.temp)}°C</div> {/* Add margin to push temperature to the right */}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
