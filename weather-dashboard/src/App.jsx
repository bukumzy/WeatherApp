import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = async (city) => {
  setLoading(true);
  setError("");
  setWeather(null);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (response.status === 401) {
      throw new Error("API key is invalid or not activated");
    }

    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling.");
    }

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    const data = await response.json();
    setWeather(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          Weather Dashboard
      </h1>


      <SearchBar onSearch={handleSearch} />

      {/* Weather display */}
      <WeatherCard weather={weather} />
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
