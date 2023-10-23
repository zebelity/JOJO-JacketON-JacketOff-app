import { WeatherContext } from 'contexts/WeatherContext'
import { useContext } from 'react'
import './Recommendation.css'
import { UserPreferences, useUserPreferences } from 'contexts/PreferenceContext'
import { WeatherData } from '@shared/types'

function getRecommendation (weather: WeatherData, userPreferences:UserPreferences): string {
  const currentWeather = weather.current
  if (
    currentWeather.temp_c <= userPreferences.temperature ||
    currentWeather.humidity <= userPreferences.humidity ||
    currentWeather.wind_mph >= userPreferences.windspeed
  ) {
    return 'Jacket ON'
  } else {
    return 'Jacket OFF'
  }
}

export default function Recommendation () {
  const { weather } = useContext(WeatherContext)
  const { preferences } = useUserPreferences()
  if (weather === null) {
    return (
      <p className='code'>Loading recommendation data...</p>
    )
  }

  const recommendation = getRecommendation(weather, preferences)

  return (
    <section className='recommendation-section'>
      <p>{recommendation}</p>
      <div className='jacket-icon'>
         {recommendation === 'Jacket ON'
           ? (
        <img src="/jacket.png" alt="jacket-on" />
             )
           : (
        <img src="/shirt.png" alt="jacket-off" />
             )}
      </div>
    </section>
  )
}
