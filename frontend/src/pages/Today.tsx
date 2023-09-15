import './Today.css'
import { useContext, useState, useEffect } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'
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

  function formatDate(date: Date): string {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  const now = new Date(); // Replace this with your date
  const formattedDate = formatDate(now);
  //console.log(formattedDate); // Output: Tue, 5 Sep 2023
  

  return (
    <div className="today-section">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="./public/home.png" alt="home" />
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
          <p>Sunrise</p>
          <h3>{todayAstro?.astronomy.astro.sunrise}</h3>
          <p>Sunset</p>
          <h3>{todayAstro?.astronomy.astro.sunset}</h3>
        </div>
        </>
          )
        : <p className='code'>Loading weather data...</p>}
      </section>

    </div>
  )
}
