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
  
  return (
    <>
      <h1>JOJO App</h1>
      <div className='content'>
        {message !== null
          ? <div className='code message'>{JSON.stringify({ message }, null)}</div>
          : <div className='code'>Loading server response...</div>
        }
        <br/>
        The following type is shared between the frontend and backend:<br/><br/>
        <div className='code type'>{'type Greeting = {\n  message: string\n}'}</div>

        <div>
          {weather ? (
            <div>
              <h2>Weather</h2>
              <h3> {weather.location.name} </h3>
              <img src={weather.current.condition.icon} alt="icon" />
              <p>Temperature: {weather.current.temp_c} °C</p>
              <p>Humidity: {weather.current.humidity} % </p>
              <p>Wind: {weather.current.wind_mph} km/h</p>
            </div>
          ):
          <p>Loading weather data...</p>}
        </div>
      </div>
    </>
  )
}

export default App
