import { useState, useEffect } from "react";
import Loader from "../Loader";
import styled from "styled-components";

async function fetchWeatherData(lat, lon) {
  const apiKey = "c46a176f1e1d8e5b501bf7b333032d33"; // API key from OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
    return <p><Loader /></p>;
  }
  return (
    <WeatherContainer>
        <MainSection>
      <Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
      <WeatherIcon src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
</MainSection>
      <WeatherDescription>{weatherData.weather[0].description}</WeatherDescription>
      <AdditionalInfo>
        <div>
          <InfoLabel>Humidity 💧</InfoLabel>
          <InfoValue>{weatherData.main.humidity}%</InfoValue>
        </div>
        <div>
          <InfoLabel>Wind Speed 🌬️</InfoLabel>
          <InfoValue>{weatherData.wind.speed} m/s</InfoValue>
        </div>
        <div>
          <InfoLabel>Time</InfoLabel>
          <InfoValue>{new Date(weatherData.dt * 1000).toLocaleTimeString()}</InfoValue>
        </div>
      </AdditionalInfo>
    </WeatherContainer>
  );
}

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:#daebf7;
  border-radius: 8px;
  padding: 0.5rem 1rem 1rem;
`;
const MainSection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
border-radius: 10px;
`;
const WeatherIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;

const Temperature = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const WeatherDescription = styled.p`
`;

const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoLabel = styled.p`
  font-weight: bold;
`;

const InfoValue = styled.p`
`;
