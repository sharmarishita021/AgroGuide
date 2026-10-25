import React from 'react';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherCard({ district }) {
  const { data: weather, loading, error, refetch } = useWeather(district?.lat, district?.lon);

  return (
    <div className="weather-dashboard-card">
      <div className="weather-card-header">
        <div>
          <span className="live-pill">LIVE AGRO-METEOROLOGY</span>
          <h3 className="weather-location-title">
            {district?.name}, {district?.stateName}
          </h3>
          <p className="weather-geo-sub">
            Coordinates: {district?.lat.toFixed(2)}° N, {district?.lon.toFixed(2)}° E • Agro-Zone: {district?.climateZone}
          </p>
        </div>
        <button
          className="refresh-weather-btn"
          onClick={refetch}
          disabled={loading}
          title="Refresh live data via Open-Meteo REST API"
        >
          {loading ? 'Fetching...' : 'Refresh Telemetry'}
        </button>
      </div>

      {loading && (
        <div className="weather-loading-state">
          <div className="spinner"></div>
          <p>Connecting to Open-Meteo REST API for live weather telemetry...</p>
        </div>
      )}

      {error && !weather && (
        <div className="weather-error-banner">
          <span className="error-title">Telemetry Error:</span>
          <span className="error-msg">{error}</span>
          <button onClick={refetch} className="btn-secondary btn-sm">Retry Connection</button>
        </div>
      )}

      {weather && (
        <div className="weather-content-wrapper">
          {/* Main Current Conditions Hero */}
          <div className="current-conditions-row">
            <div className="current-temp-block">
              <div className="weather-condition-badge">
                <span className="cond-tag">Current Climate</span>
                <span className="cond-val">{weather.current.condition}</span>
              </div>
              <div className="temp-display-wrap">
                <div className="temp-degree-wrap">
                  <span className="temp-number">{weather.current.temperature}</span>
                  <span className="temp-unit">°C</span>
                </div>
                <div className="condition-status-text">
                  {weather.current.label} • Heat Index Feels Like {weather.current.apparentTemperature}°C
                </div>
              </div>
            </div>

            {/* Micro Agro-Metrics Grid */}
            <div className="agro-metrics-grid">
              <div className="agro-metric-box">
                <span className="metric-tag">HUMIDITY</span>
                <span className="metric-label">Relative Moisture</span>
                <span className="metric-val">{weather.current.humidity}%</span>
                <span className="metric-hint">
                  {weather.current.humidity > 70 ? 'High fungal spore risk' : 'Optimal crop transpiration'}
                </span>
              </div>

              <div className="agro-metric-box">
                <span className="metric-tag">WIND SPEED</span>
                <span className="metric-label">Surface Velocity</span>
                <span className="metric-val">{weather.current.windSpeed} km/h</span>
                <span className="metric-hint">
                  {weather.current.windSpeed > 20 ? 'Avoid spray drifting' : 'Safe for foliar spray'}
                </span>
              </div>

              <div className="agro-metric-box">
                <span className="metric-tag">RAINFALL</span>
                <span className="metric-label">Precipitation Today</span>
                <span className="metric-val">{weather.current.precipitation} mm</span>
                <span className="metric-hint">Surface gauge count</span>
              </div>

              <div className="agro-metric-box">
                <span className="metric-tag">SOIL &amp; RAIN</span>
                <span className="metric-label">District Soil Class</span>
                <span className="metric-val text-truncate">{district?.soilType}</span>
                <span className="metric-hint">Avg Rain: {district?.avgAnnualRainfall}</span>
              </div>
            </div>
          </div>

          {/* 5-Day Agricultural Weather Outlook */}
          <div className="forecast-section">
            <h4 className="forecast-title">5-Day Regional Krishi Outlook</h4>
            <div className="forecast-cards-grid">
              {weather.daily.map((day, idx) => (
                <div key={idx} className="forecast-day-card">
                  <span className="forecast-date">{day.date}</span>
                  <div className="forecast-condition-pill">{day.label}</div>
                  <div className="forecast-temp-range">
                    <span className="max-temp">{day.maxTemp}°C</span>
                    <span className="temp-divider">/</span>
                    <span className="min-temp">{day.minTemp}°C</span>
                  </div>
                  <span className="forecast-rain">Rain: {day.rainSum} mm</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
