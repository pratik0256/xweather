import React, { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "425c820e21b841008f473201241107"; 

  const getWeatherData = async () => {
    if (!cityName) return;

    setIsLoading(true); // 
    setWeatherInfo(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
      );
      const weatherResponse = await response.json();

      if (response.ok) {
        setWeatherInfo(weatherResponse);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={getWeatherData}>Search</button>

      {}
      {isLoading && <p className="loading-text">Loading data...</p>}

      {weatherInfo && (
        <div className="weather-cards">
          {}
          <div className="weather-card">
            <p>Temperature: {weatherInfo.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity: {weatherInfo.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition: {weatherInfo.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed: {weatherInfo.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
