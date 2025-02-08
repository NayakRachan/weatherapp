import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloudy_icon from "../assets/cloudy.png";
import humid_icon from "../assets/humid.png";
import rainy_icon from "../assets/rainy.png";
import sunny_icon from "../assets/sunny.png";
import drizzle_icon from "../assets/drizzle.png";
import windy_icon from "../assets/windy.png";

const Weather = () => {
    const [query, setQuery] = useState("London"); // ✅ Added query state
    const [weatherData, setWeatherData] = useState(null); // ✅ Use null instead of false
    const [error, setError] = useState(null); // ✅ Store errors

    const allIcons = {
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": cloudy_icon,
        "04n": cloudy_icon,
        "09d": rainy_icon,
        "09n": rainy_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "11d": rainy_icon,
        "11n": rainy_icon,
        "13d": rainy_icon,
        "13n": rainy_icon,
        "50d": drizzle_icon,
        "50n": drizzle_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok || !data.weather) {
                setError("City not found. Try again.");
                setWeatherData(null);
                return;
            }

            setError(null); // ✅ Clear error when successful
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: allIcons?.[data.weather[0]?.icon] || cloudy_icon, // ✅ Fix missing icon
            });

            console.log("Weather data updated:", data);
        } catch (error) {
            setError("Error fetching data. Please try again.");
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        search(query); // ✅ Auto-fetch weather data for the default city
    }, []);

    return (
        <div className="weather">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="bb" onClick={() => search(query)}>
                  
                </button>
            </div>

            {error && <p className="error">{error}</p>} {/* ✅ Show error messages */}

            {weatherData && (
                <>
                    <img className="weather-icon" src={weatherData.icon} alt="Weather Icon" />
                    <p className="temperature">{weatherData.temperature}°C</p>
                    <p className="location">{weatherData.location}</p>

                    <div className="weather_data">
                        <div className="col">
                            <img className="img" src={humid_icon} alt="" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>

                        <div className="col">
                            <img className="img" src={windy_icon} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} m/s</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
