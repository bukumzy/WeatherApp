const WeatherCard = ({ weather }) => {
  if (!weather || !weather.main || !weather.weather) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        {weather.name}, {weather.sys.country}
      </h2>

      <div className="flex items-center justify-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <span className="text-4xl font-semibold">
          {Math.round(weather.main.temp)}°C
        </span>
      </div>

      <p className="text-center capitalize text-gray-600">
        {weather.weather[0].description}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
        <div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="font-semibold">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
