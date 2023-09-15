import './Homepage.css'
import CurrentWeather from 'components/CurrentWeather'
import ForecastWeather from 'components/ForecastWeather'
import { Link } from 'react-router-dom'
import { useState,useContext } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'

export default function Homepage () {

  const { weather } = useContext(WeatherContext)

  const alertWeather = weather?.alerts?.alert
  const shouldShowAlertIcon = alertWeather?.length > 0

  return (
    <>
      <section className='top-content'> 
        <header className='app-header'>
          <div className='logo'>
            <img src="./public/logo.png" alt="logo" />
          </div>
          {shouldShowAlertIcon && (
            <Link to="/alert">
            <div className='alert-icon'>
              <button  className='aleart-btn'>
                <img src="./public/alert.png" alt="alert" />
              </button>
            </div>
            </Link>
          )}
        </header>
      </section>

      <h1>JOJO App</h1>
      <div className='content'>
        < CurrentWeather/>
        < ForecastWeather/>
        <section className='footer-content'>
          <Link to="/location">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="./public/location.png" alt="today" />
              </div>
              <h4>Location</h4>
            </div>
          </Link>
          <Link to="/today">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="./public/dotdot.png" alt="today" />
              </div>
              <h4>Today</h4>
            </div>
          </Link>
          <Link to="/setting">
            <div className="footer-card">
              <div className="icon-footer">
                <img src="./public/settings.png" alt="today" />
              </div>
              <h4>Setting</h4>
            </div>
          </Link>
        </section>
      </div>
    </>
  )
}
