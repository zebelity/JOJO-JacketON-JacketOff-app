import { useEffect, useState } from 'react'
import { getGreeting,fetchWeather } from './api'
import './App.css'
import { WeatherData } from '@shared/types'

function App () {
  const [message, setMessage] = useState<string|null>(null)
  const [weather, setWeather] = useState<WeatherData|null>(null)

  useEffect(() => {
    setTimeout(async () => {
      const result = await getGreeting()

      setMessage(result.message)
    }, 500)
  }, [])

  useEffect(() => {
    (async () => {
      const result = await fetchWeather()
      console.log({ result })
      setWeather(result)
    })()
  }, [])

  // async function getWeatherForLocation(location:string) {
  //   const result = await fetchWeather(location)
  //   setWeather(result);
  // }
  const currentWeather = weather?.current
  const forecastWeather = weather?.forecast.forecastday
  
  return (
    <>
      <h1>JOJO App</h1>
      <div className='content'>
        {/* {message !== null
          ? <div className='code message'>{JSON.stringify({ message }, null)}</div>
          : <div className='code'>Loading server response...</div>
        }
        <br/>
        The following type is shared between the frontend and backend:<br/><br/>
        <div className='code type'>{'type Greeting = {\n  message: string\n}'}</div> */}

        <div className='weather-section current-weather'>
          {weather ? (
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
          ):
          <p>Loading weather data...</p>}
        </div>
        <div className='weather-section forecast-weather'>
          <div className='forecast-card'>
            <p>Day1</p>
            <img src={forecastWeather[1].day.condition.icon} alt="day1" />
            <p> {forecastWeather[1].day.avgtemp_c} °C</p>
          </div>
          <div className='forecast-card'>
            <p>Day2</p>
            <img src={forecastWeather[2].day.condition.icon} alt="day2" />
            <p> {forecastWeather[2].day.avgtemp_c} °C</p>
          </div>
          <div className='forecast-card'>
            <p>Day3</p>
            <img src={forecastWeather[3].day.condition.icon} alt="day3" />
            <p> {forecastWeather[3].day.avgtemp_c} °C</p>
          </div>  
          <div className='forecast-card'>
            <p>Day4</p>
            <img src={forecastWeather[4].day.condition.icon} alt="day4" />
            <p> {forecastWeather[4].day.avgtemp_c} °C</p>
          </div> 
          <div className='forecast-card'>
            <p>Day5</p>
            <img src={forecastWeather[5].day.condition.icon} alt="day5" />
            <p> {forecastWeather[5].day.avgtemp_c} °C</p>
          </div> 
          
        </div>
      </div>
    </>
  )
}

export default App
