import { useContext } from 'react'
import { WeatherContext } from 'contexts/WeatherContext'
import './CurrentWeather.css'

export default function CurrentWeather () {
  const { weather } = useContext(WeatherContext)

  const currentWeather = weather?.current

  return (
    <div className='smartphone tablet normal'>
      {weather
        ? (
        <div className='weather-section'>
          <div className='weather-wrap'>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="/droplets.png" alt="humidity" />
              </div>
              <p>{currentWeather?.humidity} % </p>
            </div>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="/thermometer.png" alt="icon" />
              </div>
              <p>{currentWeather?.temp_c} °C</p>
            </div>
            <div className='wrap-icon'>
              <div className='icon-container'>
                <img src="/wind.png" alt="wind" />
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
