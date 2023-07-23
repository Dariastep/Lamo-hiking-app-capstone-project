import { useState, useEffect } from "react";

async function fetchWeatherData(lat, lon) {
  const apiKey = "c46a176f1e1d8e5b501bf7b333032d33"; // API key from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch weather data.");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Weather({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function getWeatherData() {
      if (lat && lon) {
        const data = await fetchWeatherData(lat, lon);
        setWeatherData(data);
      }
    }
    getWeatherData();
  }, [lat, lon]);

  if (!weatherData) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>Temperature: {weatherData.main.temp} °C</p>
    </div>
  );
}
