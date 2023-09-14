
import type { WeatherData } from '@shared/types'
import env from './env'

export async function fetchWeather() {
  const response = await fetch(`${env.serverUrl}/`)
  const result = await response.json() as WeatherData

  return result
}

