import { useContext } from 'react'
import { WeatherContext } from 'WeatherContext.tsx';
import './ForecastWeather.css'

export default function ForecastWeather() {

  const { weather } = useContext(WeatherContext);

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
  )
}