import './Today.css'
import { useContext, useState, useEffect } from 'react'
import { WeatherContext } from 'contexts/WeatherContext'
import { fetchTodayWeather } from 'api.ts'
import { TodayData } from '@shared/types'
import { Link } from 'react-router-dom'

export default function Today () {
  const { weather } = useContext(WeatherContext)
  const currentWeather = weather?.current

  const [todayAstro, setTodayAstro] = useState<TodayData| null>(null)

  useEffect(() => {
    (async () => {
      const result = await fetchTodayWeather()
      console.log({ result })
      setTodayAstro(result)
    })().catch(err => { console.log(err) })
  }, [])

  function formatDate (date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const now = new Date()
  const formattedDate = formatDate(now)
  // console.log(formattedDate); // Output: Tue, 5 Sep 2023

  const uvIndex = Number(currentWeather?.uv).toFixed(1)

  return (
    <section className="global today-section smartphone tablet normal">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="/home.png" alt="home" />
        </div>
        </Link>
        <h2>Today</h2>
      </div>
      <section className='today-content'>
      {weather
        ? (
        <>
        <div className='today-data'>
          <div className='wrap-date'>
            <h3> {weather.location.name} </h3>
            <p>{formattedDate}</p>
            <h4>{currentWeather?.temp_c} °C</h4>
          </div>
          <div className='today-icon'>
            <img className='mainicon' src={currentWeather?.condition.icon} alt="icon" />
          </div>
        </div>
        <div className='astro-data'>
          <div className='sunrise-card'>
            <h3>Sunrise</h3>
            <div className='astro-icon'>
              <img src="/sunrise.png" alt="sunrise" />
            </div>
            <p>{todayAstro?.astronomy.astro.sunrise}</p>
          </div>
          <div className='sunset-card'>
            <h3>Sunset</h3>
            <div className='astro-icon'>
              <img src="/sunset.png" alt="sunset" />
            </div>
            <p>{todayAstro?.astronomy.astro.sunset}</p>
          </div>
        </div>
        <div className='info-data'>
          <div className='info-card'>
              <h3>UV</h3>
              <div className='info-icon'>
                <img src="/uvindex.png" alt="uv" />
              </div>
              <p>{uvIndex}</p>
          </div>
          <div className='info-card'>
              <h3>Humidity</h3>
              <div className='info-icon'>
                <img src="/humidity.png" alt="humidity" />
              </div>
              <p>{currentWeather?.humidity}</p>
          </div>
          <div className='info-card'>
              <h3>Wind</h3>
              <div className='info-icon'>
                <img src="/wind2.png" alt="wind" />
              </div>
              <p>{currentWeather?.wind_mph} km/h</p>
          </div>
        </div>

        </>
          )
        : <p className='code'>Loading weather data...</p>}
      </section>
    </section>
  )
}
