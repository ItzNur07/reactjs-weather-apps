import React, { useState } from 'react';
import { featchWeather } from './api/fetchWeather';
import './App.css';

function App() {
  
  const [query, setQuery] = useState("")
  const [weather , setWeather] = useState({})
  const search = async (e) =>{
      if(e.key === 'Enter'){
        const data = await featchWeather(query);
        setWeather(data);
        console.log(weather);
      }
  }
  const queryHandler = (e) => {
    setQuery(e.target.value)
  }
  return (
    <React.Fragment>
      <div className="title">
      <h1>All Country Weather
      </h1>
      </div>
    <div className="mainContainer">
      <input 
        type="text"
        className="search"
        placeholder="Write city..."
        onChange={queryHandler}
        onKeyPress={search}
      />
    </div>
    <div className="output">
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img src={`https:/openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
    </React.Fragment>
  );
}

export default App;
