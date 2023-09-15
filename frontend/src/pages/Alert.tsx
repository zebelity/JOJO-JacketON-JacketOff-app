import { useContext } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'
import { Link } from 'react-router-dom';
import './Alert.css'

export default function Alert () {
  const { weather } = useContext(WeatherContext)

  const alertWeather = weather?.alerts?.alert

  return (
    <section className='alert-section'>
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="./public/home.png" alt="home" />
        </div>
        </Link>
        <h2>Alerts</h2>
      </div>
    
    { alertWeather ? (
      alertWeather.map((alert, index) => (
        <div className='alert-content' key={index}>
          <h3>{alert.event}</h3>
          <p>{alert.headline}</p>
          <p>At {alert.areas}</p>
          <p>{alert.instruction}</p>
        </div>
      ))
    ) : (
      <p className='code'> Loading Alert data...</p>
    )}
    </section>
  )
}
