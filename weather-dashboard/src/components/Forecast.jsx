const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold text-center mb-4">
        3-Day Forecast
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 text-center shadow"
          >
            <p className="text-sm font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </p>

            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />

            <p className="font-bold">
              {Math.round(day.main.temp)}°C
            </p>

            <p className="text-sm capitalize text-gray-500">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
