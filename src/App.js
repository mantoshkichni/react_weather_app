import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    getweather("delhi");
  }, []);

  const getweather = async (location) => {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f56f24967aaf51182d1d4df628297c6d`
    );
    console.log(data.data);
    setWeatherData(data.data);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const location = e.target.input.value;
    console.log(location);
    getweather(location);
  };
  return (
    <div className="App">
      <div className="contanier">
        <div className="left_section">
          <form onSubmit={submitHandler} autocomplete="off">
            <div className="input_class">
              <input placeholder="location" name="input"></input>
            </div>
            <div>
              <button type="submit">Get Weather</button>
            </div>
          </form>
        </div>
        <div className="right_section">
          <div className="location_section">
            <h1>
              {weatherData?.name},{weatherData?.sys.country}
            </h1>
          </div>
          <div className="temp_section">
            <h1>
              {(weatherData?.main?.temp - 273).toFixed(2)}
              <span>&#8451;</span>
            </h1>
          </div>
          <div className="description_section">
            <div className="wind_now">
              <h1>Wind Now</h1>
              <h2>{weatherData?.wind.speed}km</h2>
            </div>
            <div className="feels_like">
              <h1>Feels Like</h1>
              <h2>
                {(weatherData?.main?.feels_like - 273).toFixed(2)}
                <span>&#8451;</span>
              </h2>
            </div>
            <div className="humidity">
              <h1>Humidity</h1>
              <h2>{weatherData?.main.humidity}%</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
