import './App.css';
import { useState } from 'react';
import axios from 'axios'
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_URL, WEATHER_API } from './api'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    axios.all([
      axios.get(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`),
      axios.get(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`)])
      .then(axios.spread((res1, res2) => {
        console.log({city: searchData.label, ...res1.data})
        const weatherRes = {city: searchData.label, ...res1.data};
        const forecastRes = {city: searchData.label, ...res2.data};
        setCurrentWeather(weatherRes);
        setForecast(forecastRes);
      }))
      .catch((err) => console.log(err));

  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
