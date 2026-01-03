import { useState } from "react";
import SearchBar from "./components/SearchBar";

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

      if (!response.ok) {
        throw new Error("City not found");
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
      <h1 className="text-2xl font-bold text-center mb-6">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="text-center mt-4">Loading...</p>
      )}

      {error && (
        <p className="text-center mt-4 text-red-600">{error}</p>
      )}

      {weather && (
        <pre className="mt-6 bg-white p-4 rounded-lg max-w-md mx-auto overflow-x-auto">
          {JSON.stringify(weather, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
console.log(import.meta.env.VITE_WEATHER_API_KEY);
