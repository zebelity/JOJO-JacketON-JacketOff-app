import { useContext } from 'react'
import { WeatherContext } from 'contexts/WeatherContext'
import './CurrentData.css'

export default function CurrentData () {
  const { weather } = useContext(WeatherContext)

  const currentWeather = weather?.current

  return (
    <div className='smartphone tablet normal'>
      {weather
        ? (
        <div className='current-weather'>
          <h2 > {weather.location.name} </h2>
          <img className='mainicon' src={currentWeather?.condition.icon} alt="icon" />
          <p> {currentWeather?.condition.text} </p>
        </div>
          )
        : <p className='code'>Loading weather data...</p>}
    </div>
  )
}
