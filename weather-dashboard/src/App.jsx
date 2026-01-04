import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Forecast from "./components/Forecast";


function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = async (city) => {
  setLoading(true);
  setError("");
  setWeather(null);
  setForecast([]);

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) {
      throw new Error("City not found");
    }

    const weatherData = await weatherResponse.json();
    setWeather(weatherData);

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const forecastData = await forecastResponse.json();

    // Pick one forecast per day (every 24hrs)
    const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 3);

    setForecast(dailyForecast);

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-4">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">
          Weather Dashboard
        </h1>

      <SearchBar onSearch={handleSearch} />

      {/* Weather display */}
      <WeatherCard weather={weather} />
      <Forecast forecast={forecast} />

      {weather && (
        <div className="text-center mt-4">
          <button
            onClick={() => handleSearch(weather.name)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Refresh
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center mt-4">Loading...</p>
      )}

      {error && (
        <ErrorMessage message={error} />
      )}
    </div>
  );
}

export default App;
