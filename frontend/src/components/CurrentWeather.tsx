import { useContext } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'
import './CurrentWeather.css'
import { useLocation } from 'react-router-dom';

export default function CurrentWeather () {
  const { weather } = useContext(WeatherContext)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedLocation = searchParams.get('location');
  console.log({searchParams})
  console.log({selectedLocation})

  const currentWeather = weather?.current
  return (
    <div className='weather-section current-weather'>
      {weather
        ? (
        <div>
          <img className='mainicon' src={currentWeather?.condition.icon} alt="icon" />
          <h2> {weather.location.name} </h2>
          <p> {currentWeather?.condition.text} </p>
          <div className='weather-wrap'>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="./public/droplets.png" alt="humidity" />
              </div>
              <p>{currentWeather?.humidity} % </p>
            </div>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="./public/thermometer.png" alt="icon" />
              </div>
              <h4>{currentWeather?.temp_c} °C</h4>
            </div>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="./public/wind.png" alt="wind" />
              </div>
              <p>{currentWeather?.wind_mph} km/h</p>
            </div>

          </div>
        </div>
          )
        : <p className='code'>Loading weather data...</p>}
    </div>
  )
}
