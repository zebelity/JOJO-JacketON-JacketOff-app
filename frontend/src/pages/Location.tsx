import "./Location.css"
import { useContext, useState, useEffect } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'
import { Link } from 'react-router-dom'


export default function Location () {

  const { weather } = useContext(WeatherContext)
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationCardClick = (clickedLocation) => {
    setSelectedLocation(clickedLocation);
  };
  
  const location = weather?.location

  return (
    <section className="location-section">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="./public/home.png" alt="home" />
        </div>
        </Link>
        <h2>Manage Location</h2>
        <Link to="/search">
        <div className="plus-icon">
          <img src="/public/plus.png" alt="plus" />
        </div>
        </Link>
      </div>
      <div className="info-location">
        <div className="location-card">
          <div className="location-icon">
            <img src="/public/location.png" alt="location" />
          </div>
          <p>{location?.name} - {location?.country}</p>
        </div>
        <div className="location-card" onClick={() => handleLocationCardClick(location)}>
          
          <p>Bangkok - Thailand</p>
          <div className="trash-icon">
            <img src="/public/trash.png" alt="trash" />
          </div>
        </div>
      </div>
    </section>
    
  )
}
