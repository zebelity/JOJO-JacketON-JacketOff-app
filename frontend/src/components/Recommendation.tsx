import { WeatherContext } from 'contexts/WeatherContext'
import { useContext } from 'react'
import './Recommendation.css'
import { UserPreferences } from 'contexts/PreferenceContext'
import { WeatherData } from '@shared/types'

// Function to retrieve user preferences from local storage
// TODO: Should use the context, not access localStorage directly
function getUserPreferencesFromLocalStorage () {
  const preferences = localStorage.getItem('userPreferences')
  console.log({ preferences })
  return preferences ? JSON.parse(preferences) as UserPreferences : null
}

function getRecommendation (weather: WeatherData, userPreferences: UserPreferences): string {
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

  if (weather === null) {
    return (
      <p className='code'>Loading recommendation data...</p>
    )
  }

  const currentWeather = weather.current

  // Get user preferences from local storage
  const userPreferences = getUserPreferencesFromLocalStorage()
  console.log({ userPreferences })

  // TODO: Move default preferences into context
  const defaultRecommendation =
  currentWeather.temp_c < 15 && currentWeather.humidity < 50 && currentWeather.wind_mph > 24 ? 'Jacket ON' : 'Jacket OFF'

  // Calculate recommendation based on user preferences
  const recommendation = userPreferences ? getRecommendation(weather, userPreferences) : defaultRecommendation
  console.log({ recommendation })
  console.log({ defaultRecommendation })
  return (
    <section className='recommendation-section'>
      <p>{recommendation}</p>
      <div className='jacket-icon'>
         {recommendation === 'Jacket ON'
           ? (
        <img src="/public/jacket.png" alt="jacket-on" />
             )
           : (
        <img src="/public/shirt.png" alt="jacket-off" />
             )}
      </div>
    </section>
  )
}
