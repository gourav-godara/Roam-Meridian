import { FiCloud } from "react-icons/fi";

function WeatherCard({ weather }) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6">
      <h3 className="text-base font-semibold text-ink mb-4">Weather</h3>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-semibold text-ink">{weather.temp}°C</p>
          <p className="text-sm text-gray-500 mt-1">{weather.condition}</p>
        </div>
        <FiCloud size={40} className="text-gray-300" />
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-border">
        <div>
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-semibold text-ink mt-0.5">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-semibold text-ink mt-0.5">{weather.wind} km/h</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Feels like</p>
          <p className="text-sm font-semibold text-ink mt-0.5">{weather.feelsLike}°C</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
