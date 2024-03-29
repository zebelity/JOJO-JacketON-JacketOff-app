import './Homepage.css'
import CurrentWeather from 'components/CurrentWeather'
import ForecastWeather from 'components/ForecastWeather'
import Recommendation from 'components/Recommendation'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { WeatherContext } from 'contexts/WeatherContext'
import CurrentData from 'components/CurrentData'

export default function Homepage () {
  const { weather } = useContext(WeatherContext)

  const weatherAlerts = weather?.alerts.alert.length ?? 0
  const shouldShowAlertIcon = weatherAlerts > 0

  return (
    <div className='homepage smartphone tablet normal'>
      <section className='top-content'>
        <header className='app-header'>
          <div className='logo'>
            <img src="/logo.png" alt="logo" />
          </div>
          <h1>JOJO App</h1>
          {shouldShowAlertIcon && (
        <Link to="/alert">
          <div className='alert-icon'>
            <button className='aleart-btn'>
              <i></i>
              <img src="/alert.png" alt="alert" />
            </button>
          </div>
        </Link>
          )}
        </header>
      </section>

      <div className='content'>
        < CurrentData/>
        < Recommendation/>
        < CurrentWeather/>
        < ForecastWeather/>
        <section className='footer-content'>
          <Link to="/location">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="/location.png" alt="today" />
              </div>
              <h4>Location</h4>
            </div>
          </Link>
          <Link to="/today">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="/dotdot.png" alt="today" />
              </div>
              <h4>Today</h4>
            </div>
          </Link>
          <Link to="/setting">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="/settings.png" alt="today" />
              </div>
              <h4>Setting</h4>
            </div>
          </Link>
        </section>
      </div>
    </div>
  )
}
