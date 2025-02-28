import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  const fetchWeather = useCallback(async (location) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeatherData({
        temp: response.data.main.temp,
        city: response.data.name,
        country: response.data.sys.country,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed
      });
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.', error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]); 

  // Using useEffect to fetch weather data when the city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]); 

// Handle city search input
const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
        fetchWeather(city);
    }
};


return (
  <div className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-200/30 border border-gray-100/50">
    <form 
      onSubmit={handleSearch} 
      className="mb-8 flex gap-3 relative group"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="flex-1 pl-12 pr-6 py-4 border-0 bg-gray-50/80 rounded-xl text-lg font-medium placeholder-gray-400/80 focus:ring-4 focus:ring-blue-400/20 focus:bg-white transition-all duration-300 shadow-sm"
        style={{ backdropFilter: 'blur(12px)' }}
      />
      <svg 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400/80 group-focus-within:text-blue-500 transition-colors"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span className="animate-pulse">Searching</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : 'Search'}
      </button>
    </form>

    {error && (
      <div className="mb-6 p-4 flex items-center gap-3 bg-red-50/50 border border-red-100 rounded-xl animate-fadeIn">
        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-red-600 font-medium">{error}</div>
      </div>
    )}

    {weatherData && !error && (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center space-y-1">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            {weatherData.city}, {weatherData.country}
          </h2>
          <p className="text-gray-500/90 font-medium">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative w-full max-w-[240px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/30 rounded-2xl transform rotate-6"></div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
              alt="Weather icon"
              className="relative z-10 w-full h-auto drop-shadow-2xl"
            />
          </div>
          
          <div className="space-y-4">
            <div className="text-6xl font-bold text-gray-900">
              {Math.round(weatherData.temp)}°
              <span className="text-4xl align-top ml-1 text-gray-600">C</span>
            </div>
            <p className="text-xl font-medium text-gray-600 capitalize">
              {weatherData.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Feels Like', value: `${Math.round(weatherData.feels_like)}°C`, icon: 'thermometer' },
            { label: 'Humidity', value: `${weatherData.humidity}%`, icon: 'droplet' },
            { label: 'Wind Speed', value: `${weatherData.wind} m/s`, icon: 'wind' }
          ].map((metric, idx) => (
            <div 
              key={idx}
              className="p-5 bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:border-blue-100/80 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100/50">
                  <svg 
                    className="w-6 h-6 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {metric.icon === 'thermometer' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {metric.icon === 'droplet' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    )}
                    {metric.icon === 'wind' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 15l7-7 7 7" />
                    )}
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500/90">{metric.label}</div>
                  <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default Weather;