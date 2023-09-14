import './Homepage.css'
import Alert from 'components/Alert'
import CurrentWeather from 'components/CurrentWeather';
import ForecastWeather from 'components/ForecastWeather';
import { Link } from 'react-router-dom';

export default function Homepage(){

  return (
    <>
      <section className='top-content'>
        < Alert />
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