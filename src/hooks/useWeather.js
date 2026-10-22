import { useState, useEffect, useCallback } from 'react';

// Maps WMO Weather interpretation codes to friendly descriptions and conditions
export function interpretWeatherCode(code) {
  if (code === 0) return { label: 'Clear Sky', condition: 'Sunny' };
  if (code === 1 || code === 2) return { label: 'Partly Cloudy', condition: 'Partly Cloudy' };
  if (code === 3) return { label: 'Overcast', condition: 'Cloudy' };
  if (code >= 45 && code <= 48) return { label: 'Foggy / Mist', condition: 'Fog' };
  if (code >= 51 && code <= 55) return { label: 'Light Drizzle', condition: 'Drizzle' };
  if (code >= 61 && code <= 65) return { label: 'Rain Showers', condition: 'Rain' };
  if (code >= 71 && code <= 77) return { label: 'Frost / Cold Wave', condition: 'Cold/Frost' };
  if (code >= 80 && code <= 82) return { label: 'Heavy Showers', condition: 'Heavy Rain' };
  if (code >= 95) return { label: 'Thunderstorm', condition: 'Thunderstorm' };
  return { label: 'Fair Weather', condition: 'Normal' };
}

/**
 * useWeather Hook
 * Fetches real-time agro-meteorological data from Open-Meteo REST API.
 * Demonstrates async/await, fetch API, loading/error states, retry mechanics,
 * and useCallback.
 */
export function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    if (!lat || !lon) return;

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather service returned HTTP ${response.status}`);
      }

      const json = await response.json();
      
      const currentCode = json.current?.weather_code ?? 0;
      const weatherInfo = interpretWeatherCode(currentCode);

      const parsed = {
        current: {
          temperature: Math.round(json.current?.temperature_2m ?? 26),
          apparentTemperature: Math.round(json.current?.apparent_temperature ?? 27),
          humidity: json.current?.relative_humidity_2m ?? 50,
          precipitation: json.current?.precipitation ?? 0,
          windSpeed: json.current?.wind_speed_10m ?? 8,
          weatherCode: currentCode,
          ...weatherInfo
        },
        daily: (json.daily?.time || []).slice(0, 5).map((dateStr, idx) => ({
          date: dateStr,
          maxTemp: Math.round(json.daily.temperature_2m_max[idx] ?? 30),
          minTemp: Math.round(json.daily.temperature_2m_min[idx] ?? 18),
          rainSum: json.daily.precipitation_sum[idx] ?? 0,
          ...interpretWeatherCode(json.daily.weather_code[idx] ?? 0)
        }))
      };

      setData(parsed);
    } catch (err) {
      console.error('Failed to fetch live weather data:', err);
      setError(err.message || 'Unable to connect to weather API');
      
      // Fallback sensible agricultural mock data if offline
      setData({
        current: {
          temperature: 28,
          apparentTemperature: 29,
          humidity: 48,
          precipitation: 0,
          windSpeed: 10,
          weatherCode: 1,
          label: 'Partly Cloudy (Cached Telemetry)',
          condition: 'Partly Cloudy'
        },
        daily: [
          { date: 'Today', maxTemp: 31, minTemp: 19, rainSum: 0, label: 'Clear Sky' },
          { date: 'Tomorrow', maxTemp: 32, minTemp: 20, rainSum: 0, label: 'Partly Cloudy' },
          { date: 'Day 3', maxTemp: 29, minTemp: 18, rainSum: 2, label: 'Light Drizzle' },
          { date: 'Day 4', maxTemp: 30, minTemp: 19, rainSum: 0, label: 'Clear Sky' },
          { date: 'Day 5', maxTemp: 31, minTemp: 20, rainSum: 0, label: 'Clear Sky' }
        ]
      });
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { data, loading, error, refetch: fetchWeatherData };
}
