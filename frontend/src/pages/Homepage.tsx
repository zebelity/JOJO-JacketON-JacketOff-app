import { useContext } from 'react'
import { WeatherContext } from 'WeatherContext.tsx';
import './Homepage.css'


export default function Homepage(){

  const { weather } = useContext(WeatherContext);

  const currentWeather = weather?.current
  const forecastWeather = weather?.forecast.forecastday

  // to get the name of the day of the week
  const getDayName = (dateString: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const date = new Date(dateString);
    //console.log({date})
    const weekday = days[date.getDay()];
    //console.log({weekday})
    return weekday
  };

  // Filter forecast data starting from tomorrow
  const today = new Date();
  today.setDate(today.getDate());

  const nextDayForecast = forecastWeather?.filter((day: string) => {
    const nextDays = new Date(day.date);
    //console.log({nextDays})
    return nextDays >= today;
  });
  
  return (
    <>
    <h1>JOJO App</h1>
    <div className='content'>
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
          <p className='code'>Loading weather data...</p>}
        </div>

        <div className='weather-section forecast-weather'>
          { nextDayForecast? (
            <>
            {nextDayForecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <p>{getDayName(day.date)}</p>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <p>{day.day.avgtemp_c} °C</p>
              </div>
            ))}
            </>
            ) : (
            <p className='code'>Loading forecast weather data...</p>
          )}
        </div>
      </div>
    </>
  )
}