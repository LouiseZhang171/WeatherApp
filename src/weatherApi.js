import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (location, country) => {
  try {
    const url = `${BASE_URL}?q=${location},${country}&appid=${API_KEY}&units=metric`;
    console.log('Request URL:', url); 
    const response = await axios.get(url);
    console.log('API Response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    throw error;
  }
};
