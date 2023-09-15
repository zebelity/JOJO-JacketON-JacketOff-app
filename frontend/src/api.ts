import type { WeatherData,TodayData } from '@shared/types'
import env from './env'

export async function fetchWeather () {
  const response = await fetch(`${env.serverUrl}/`)
  const result = await response.json() as WeatherData

  return result
}

export async function fetchTodayWeather () {
  const response = await fetch(`${env.serverUrl}/today`)
  const result = await response.json() as TodayData

  return result
}