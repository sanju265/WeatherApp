import React, { useState, useEffect } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeandLocation from './components/TimeandLocation';
import TempandDetails from './components/TempandDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import getAirQualityIndex from './services/aqiService'; // Import the AQI service

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "ahmedabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const getWeather = async () => {
    const cityName = query.q ? query.q : 'current location';
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
      const airQualityIndex = await getAirQualityIndex(query.q);
      setAqi(airQualityIndex);
      console.log(data);
      console.log('AQI:', airQualityIndex);
      if (query.q && !searchHistory.includes(query.q.toLowerCase())) {
        setSearchHistory([...searchHistory, query.q.toLowerCase()]);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const localTime = (weather.dt + weather.timezone) % 86400;
    if (localTime >= 21600 && localTime < 64800) {
      return "from-yellow-600 to-orange-700"; // 6 AM to 6 PM
    } else {
      return "from-cyan-600 to-blue-700"; // 6 PM to 6 AM
    }
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} searchHistory={searchHistory} />

      {weather && (
        <>
          <TimeandLocation weather={weather} />
          <TempandDetails weather={weather} units={units} />
          {aqi && <div className="text-center text-lg">Air Quality Index: {aqi}</div>}
          <Forecast title="3 hour step Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
