import React, { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "425c820e21b841008f473201241107";

  const getWeatherData = async () => {
    if (!cityName) return;

    setIsLoading(true);
    setWeatherInfo(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
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

      {isLoading && <p>Loading data…</p>}

      {weatherInfo && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>{weatherInfo.location.name}</h3>
            <p>Temperature: {weatherInfo.current.temp_c}°C</p>
            <p>Humidity: {weatherInfo.current.humidity}%</p>
            <p>Condition: {weatherInfo.current.condition.text}</p>
            <p>Wind Speed: {weatherInfo.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
