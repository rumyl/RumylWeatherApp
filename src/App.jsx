import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const apiKey = 'c60ad3123b45524f4c2221e366a525c4';
  const [weatherData, setWeatherData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );

          setWeatherData(response.data);
          setTemperature(response.data.main.temp);
          setError('');
        } catch (error) {
          setWeatherData(null);
          setError('Error retrieving weather data');
        }
      }
    };

    fetchData();
  }, [city, apiKey]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <>
      <div id="content">
        <h2>Weather App:</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a City"
        />
        {error && <div>{error}</div>}
        {weatherData && (
          <div>
            <h1>{city}</h1>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Temperature: {temperature}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Cloudiness: {weatherData.clouds.all}%</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
