<<<<<<< HEAD
/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/weather.css"; // External CSS file

// Weather icons mapping
const weatherIcons = {
  Sunny: "☀️",
  Clear: "🌙",
  "Partly cloudy": "⛅",
  Cloudy: "☁️",
  Overcast: "☁️",
  Mist: "🌫️",
  Fog: "🌫️",
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/weather.css'; // External CSS file

// Weather icons mapping
const weatherIcons = {
  "Sunny": "☀️",
  "Clear": "🌙",
  "Partly cloudy": "⛅",
  "Cloudy": "☁️",
  "Overcast": "☁️",
  "Mist": "🌫️",
  "Fog": "🌫️",
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
  "Patchy rain possible": "🌦️",
  "Patchy snow possible": "🌨️",
  "Patchy sleet possible": "🌧️",
  "Patchy freezing drizzle possible": "🌧️",
  "Thundery outbreaks possible": "⛈️",
  "Blowing snow": "❄️",
<<<<<<< HEAD
  Blizzard: "❄️",
=======
  "Blizzard": "❄️",
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
  "Light rain": "🌧️",
  "Moderate rain": "🌧️",
  "Heavy rain": "🌧️",
  "Light snow": "🌨️",
  "Moderate snow": "🌨️",
  "Heavy snow": "🌨️",
  "Light rain shower": "🌦️",
  "Moderate or heavy rain shower": "🌧️",
  "Torrential rain shower": "🌧️",
  "Light sleet showers": "🌧️",
  "Moderate or heavy sleet showers": "🌧️",
  "Light snow showers": "🌨️",
  "Moderate or heavy snow showers": "🌨️",
  "Light showers of ice pellets": "🌨️",
  "Moderate or heavy showers of ice pellets": "🌨️",
  "Patchy light rain with thunder": "⛈️",
  "Moderate or heavy rain with thunder": "⛈️",
  "Patchy light snow with thunder": "⛈️",
<<<<<<< HEAD
  "Moderate or heavy snow with thunder": "⛈️",
};

const WeatherDashboard = () => {
  const [pincode, setPincode] = useState("");
=======
  "Moderate or heavy snow with thunder": "⛈️"
};

const WeatherDashboard = () => {
  const [pincode, setPincode] = useState('');
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
  const [pincodeData, setPincodeData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendSuccess, setBackendSuccess] = useState(false);
  const [backendError, setBackendError] = useState(null);

  const fetchPincodeData = async () => {
    if (!pincode) {
      setError("Please enter a pincode");
      return;
    }

    setLoading(true);
    setError(null);
    setBackendError(null);
    setBackendSuccess(false);
    setPincodeData(null);
    setWeatherData(null);

    try {
<<<<<<< HEAD
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (
        response.data &&
        response.data[0] &&
        response.data[0].Status === "Success"
      ) {
        setPincodeData(response.data[0]);

        // Fetch weather data using the Division from the first post office
        if (
          response.data[0].PostOffice &&
          response.data[0].PostOffice.length > 0
        ) {
=======
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      
      if (response.data && response.data[0] && response.data[0].Status === "Success") {
        setPincodeData(response.data[0]);
        
        // Fetch weather data using the Division from the first post office
        if (response.data[0].PostOffice && response.data[0].PostOffice.length > 0) {
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
          const division = response.data[0].PostOffice[0].Division;
          fetchWeatherData(division);
        }
      } else {
        setError("No data found for this pincode");
        setLoading(false);
      }
    } catch (err) {
<<<<<<< HEAD
      setError(
        `Error fetching pincode data: ${err.message || "Unknown error"}`
      );
=======
      setError(`Error fetching pincode data: ${err.message || "Unknown error"}`);
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
      setLoading(false);
    }
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const apiKey = "5d9e5a8281354e519e945010251502"; // Your API key
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`
      );
<<<<<<< HEAD

      setWeatherData(response.data);

      // Send data to backend
      //   sendDataToBackend(response.data);
    } catch (err) {
      setError(
        `Error fetching weather data: ${err.message || "Unknown error"}`
      );
=======
      
      setWeatherData(response.data);
      
      // Send data to backend
    //   sendDataToBackend(response.data);
    } catch (err) {
      setError(`Error fetching weather data: ${err.message || "Unknown error"}`);
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
      setLoading(false);
    }
  };

<<<<<<< HEAD
  //   const sendDataToBackend = async (data) => {
  //     try {
  //       // Adding timeout and proper headers
  //       const response = await axios.post('http://localhost:2590/api/v1/contact', data, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         timeout: 10000 // 10 second timeout
  //       });

  //       setBackendSuccess(true);
  //       console.log('Data sent to backend successfully:', response.data);
  //     } catch (err) {
  //       setBackendError(`Failed to send data to backend: ${err.message || "Unknown error"}`);
  //     //   console.error('Error sending data to backend:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const getAQILevel = (index) => {
    if (!index) return { level: "Unknown", color: "#999" };

    if (index <= 1) return { level: "Good", color: "#00E400" };
    if (index <= 2) return { level: "Moderate", color: "#FFFF00" };
    if (index <= 3)
      return { level: "Unhealthy for Sensitive Groups", color: "#FF7E00" };
=======
//   const sendDataToBackend = async (data) => {
//     try {
//       // Adding timeout and proper headers
//       const response = await axios.post('http://localhost:2590/api/v1/contact', data, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         timeout: 10000 // 10 second timeout
//       });
      
//       setBackendSuccess(true);
//       console.log('Data sent to backend successfully:', response.data);
//     } catch (err) {
//       setBackendError(`Failed to send data to backend: ${err.message || "Unknown error"}`);
//     //   console.error('Error sending data to backend:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

  const getAQILevel = (index) => {
    if (!index) return { level: "Unknown", color: "#999" };
    
    if (index <= 1) return { level: "Good", color: "#00E400" };
    if (index <= 2) return { level: "Moderate", color: "#FFFF00" };
    if (index <= 3) return { level: "Unhealthy for Sensitive Groups", color: "#FF7E00" };
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
    if (index <= 4) return { level: "Unhealthy", color: "#FF0000" };
    if (index <= 5) return { level: "Very Unhealthy", color: "#99004C" };
    return { level: "Hazardous", color: "#7E0023" };
  };

  const getWindDirection = (dir) => {
    const directions = {
<<<<<<< HEAD
      N: "North",
      NNE: "North-Northeast",
      NE: "Northeast",
      ENE: "East-Northeast",
      E: "East",
      ESE: "East-Southeast",
      SE: "Southeast",
      SSE: "South-Southeast",
      S: "South",
      SSW: "South-Southwest",
      SW: "Southwest",
      WSW: "West-Southwest",
      W: "West",
      WNW: "West-Northwest",
      NW: "Northwest",
      NNW: "North-Northwest",
    };

=======
      'N': 'North',
      'NNE': 'North-Northeast',
      'NE': 'Northeast',
      'ENE': 'East-Northeast',
      'E': 'East',
      'ESE': 'East-Southeast',
      'SE': 'Southeast',
      'SSE': 'South-Southeast',
      'S': 'South',
      'SSW': 'South-Southwest',
      'SW': 'Southwest',
      'WSW': 'West-Southwest',
      'W': 'West',
      'WNW': 'West-Northwest',
      'NW': 'Northwest',
      'NNW': 'North-Northwest'
    };
    
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
    return directions[dir] || dir;
  };

  const handleKeyPress = (e) => {
<<<<<<< HEAD
    if (e.key === "Enter") {
=======
    if (e.key === 'Enter') {
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
      fetchPincodeData();
    }
  };

  return (
    <div className="weather-dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Weather Dashboard</h1>
<<<<<<< HEAD

=======
        
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
        <div className="search-container">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Pincode"
            className="pincode-input"
          />
          <button
            onClick={fetchPincodeData}
            disabled={loading}
<<<<<<< HEAD
            className={`search-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span>Get Weather</span>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
=======
            className={`search-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 
              <span className="loader"></span> : 
              <span>Get Weather</span>
            }
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
<<<<<<< HEAD

        {backendError && (
          <div className="backend-error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
=======
        
        {backendError && (
          <div className="backend-error-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            {backendError}
          </div>
        )}
<<<<<<< HEAD

        {backendSuccess && (
          <div className="success-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
=======
        
        {backendSuccess && (
          <div className="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Weather data successfully sent to backend
          </div>
        )}
<<<<<<< HEAD

        {pincodeData &&
          pincodeData.PostOffice &&
          pincodeData.PostOffice.length > 0 && (
            <div className="location-info-container">
              <h2 className="section-title">Location Information</h2>
              <div className="location-cards">
                <div className="info-card">
                  <h3 className="card-title">Post Office</h3>
                  <div className="card-content">
                    <div className="info-item">
                      <span className="info-label">Name:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].Name}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].BranchType}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Delivery Status:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].DeliveryStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Address</h3>
                  <div className="card-content">
                    <div className="info-item">
                      <span className="info-label">District:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].District}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Division:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].Division}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Region:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].Region}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">State:</span>
                      <span className="info-value">
                        {pincodeData.PostOffice[0].State}
                      </span>
                    </div>
=======
        
        {pincodeData && pincodeData.PostOffice && pincodeData.PostOffice.length > 0 && (
          <div className="location-info-container">
            <h2 className="section-title">Location Information</h2>
            <div className="location-cards">
              <div className="info-card">
                <h3 className="card-title">Post Office</h3>
                <div className="card-content">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].Name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].BranchType}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Delivery Status:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].DeliveryStatus}</span>
                  </div>
                </div>
              </div>
              
              <div className="info-card">
                <h3 className="card-title">Address</h3>
                <div className="card-content">
                  <div className="info-item">
                    <span className="info-label">District:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].District}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Division:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].Division}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Region:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].Region}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">State:</span>
                    <span className="info-value">{pincodeData.PostOffice[0].State}</span>
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
                  </div>
                </div>
              </div>
            </div>
<<<<<<< HEAD
          )}

        {weatherData && (
          <div className="weather-container">
            <div className="weather-header">
              <h2 className="section-title">
                Current Weather in {weatherData.location.name}
              </h2>
=======
          </div>
        )}
        
        {weatherData && (
          <div className="weather-container">
            <div className="weather-header">
              <h2 className="section-title">Current Weather in {weatherData.location.name}</h2>
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              <div className="last-updated">
                Last Updated: {weatherData.current.last_updated}
              </div>
            </div>
<<<<<<< HEAD

=======
            
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
            <div className="weather-cards">
              {/* Main Weather Card */}
              <div className="main-weather-card">
                <div className="weather-icon">
<<<<<<< HEAD
                  {weatherIcons[weatherData.current.condition.text] || "🌤️"}
=======
                  {weatherIcons[weatherData.current.condition.text] || '🌤️'}
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
                </div>
                <h3 className="weather-condition">
                  {weatherData.current.condition.text}
                </h3>
                <div className="temperature">
                  {weatherData.current.temp_c}°C
                </div>
                <div className="feels-like">
                  Feels like {weatherData.current.feelslike_c}°C
                </div>
              </div>
<<<<<<< HEAD

=======
              
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              {/* Details Card */}
              <div className="info-card">
                <h3 className="card-title">Details</h3>
                <div className="weather-details">
                  <div className="detail-item">
                    <span className="detail-label">Humidity</span>
<<<<<<< HEAD
                    <span className="detail-value">
                      {weatherData.current.humidity}%
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">
                      {weatherData.current.pressure_mb} mb
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">
                      {weatherData.current.wind_kph} km/h
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Direction</span>
                    <span className="detail-value">
                      {getWindDirection(weatherData.current.wind_dir)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">UV Index</span>
                    <span className="detail-value">
                      {weatherData.current.uv}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Visibility</span>
                    <span className="detail-value">
                      {weatherData.current.vis_km} km
                    </span>
                  </div>
                </div>
              </div>

=======
                    <span className="detail-value">{weatherData.current.humidity}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{weatherData.current.pressure_mb} mb</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">{weatherData.current.wind_kph} km/h</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Direction</span>
                    <span className="detail-value">{getWindDirection(weatherData.current.wind_dir)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">UV Index</span>
                    <span className="detail-value">{weatherData.current.uv}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Visibility</span>
                    <span className="detail-value">{weatherData.current.vis_km} km</span>
                  </div>
                </div>
              </div>
              
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              {/* Location Card */}
              <div className="info-card">
                <h3 className="card-title">Location</h3>
                <div className="card-content">
                  <div className="info-item">
                    <span className="info-label">City:</span>
<<<<<<< HEAD
                    <span className="info-value">
                      {weatherData.location.name}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Region:</span>
                    <span className="info-value">
                      {weatherData.location.region}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Country:</span>
                    <span className="info-value">
                      {weatherData.location.country}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Local Time:</span>
                    <span className="info-value">
                      {weatherData.location.localtime}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Coordinates:</span>
                    <span className="info-value">
                      {weatherData.location.lat}, {weatherData.location.lon}
                    </span>
                  </div>
                </div>
              </div>

=======
                    <span className="info-value">{weatherData.location.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Region:</span>
                    <span className="info-value">{weatherData.location.region}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Country:</span>
                    <span className="info-value">{weatherData.location.country}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Local Time:</span>
                    <span className="info-value">{weatherData.location.localtime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Coordinates:</span>
                    <span className="info-value">{weatherData.location.lat}, {weatherData.location.lon}</span>
                  </div>
                </div>
              </div>
              
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
              {/* Air Quality Card */}
              {weatherData.current.air_quality && (
                <div className="air-quality-card">
                  <h3 className="card-title">Air Quality</h3>
                  <div className="aqi-indexes">
                    <div className="aqi-index">
                      <span className="aqi-label">US EPA Index</span>
<<<<<<< HEAD
                      <div
                        className="aqi-badge"
                        style={{
                          backgroundColor: getAQILevel(
                            weatherData.current.air_quality["us-epa-index"]
                          ).color,
                        }}
                      >
                        {
                          getAQILevel(
                            weatherData.current.air_quality["us-epa-index"]
                          ).level
                        }
=======
                      <div className="aqi-badge" style={{
                        backgroundColor: getAQILevel(weatherData.current.air_quality['us-epa-index']).color
                      }}>
                        {getAQILevel(weatherData.current.air_quality['us-epa-index']).level}
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
                      </div>
                    </div>
                    <div className="aqi-index">
                      <span className="aqi-label">UK DEFRA Index</span>
<<<<<<< HEAD
                      <div
                        className="aqi-badge"
                        style={{
                          backgroundColor: getAQILevel(
                            weatherData.current.air_quality["gb-defra-index"]
                          ).color,
                        }}
                      >
                        {
                          getAQILevel(
                            weatherData.current.air_quality["gb-defra-index"]
                          ).level
                        }
                      </div>
                    </div>
                  </div>

                  <div className="pollutants">
                    <div className="pollutant-item">
                      <span className="pollutant-name">CO</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.co.toFixed(2)} μg/m³
                      </span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">NO₂</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.no2.toFixed(2)} μg/m³
                      </span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">O₃</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.o3.toFixed(2)} μg/m³
                      </span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">SO₂</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.so2.toFixed(2)} μg/m³
                      </span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">PM2.5</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.pm2_5.toFixed(2)} μg/m³
                      </span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">PM10</span>
                      <span className="pollutant-value">
                        {weatherData.current.air_quality.pm10.toFixed(2)} μg/m³
                      </span>
=======
                      <div className="aqi-badge" style={{
                        backgroundColor: getAQILevel(weatherData.current.air_quality['gb-defra-index']).color
                      }}>
                        {getAQILevel(weatherData.current.air_quality['gb-defra-index']).level}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pollutants">
                    <div className="pollutant-item">
                      <span className="pollutant-name">CO</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.co.toFixed(2)} μg/m³</span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">NO₂</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.no2.toFixed(2)} μg/m³</span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">O₃</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.o3.toFixed(2)} μg/m³</span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">SO₂</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.so2.toFixed(2)} μg/m³</span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">PM2.5</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.pm2_5.toFixed(2)} μg/m³</span>
                    </div>
                    <div className="pollutant-item">
                      <span className="pollutant-name">PM10</span>
                      <span className="pollutant-value">{weatherData.current.air_quality.pm10.toFixed(2)} μg/m³</span>
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default WeatherDashboard;
=======
export default WeatherDashboard;
>>>>>>> 5922f80c2916bb3dccf65f1e1d4d47ae6f0ceadd
