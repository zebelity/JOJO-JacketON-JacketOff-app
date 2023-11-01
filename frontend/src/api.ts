import type { WeatherData, TodayData, LocationData } from '@shared/types'
import env from './env'

export async function fetchWeather (location?: LocationData): Promise<WeatherData> {
  let url = `${env.serverUrl}/` // Default endpoint

  if (location) {
    // Append location to the URL if provided
    url += `?location=${encodeURIComponent(location.name)}` // Using encodeURIComponent to safely pass the location string in the URL
  }
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch weather. Status: ${response.status}`)
  }

  const result = await response.json() as WeatherData

  return result
}

export async function fetchTodayWeather (): Promise<TodayData> {
  const response = await fetch(`${env.serverUrl}/today`)
  if (!response.ok) {
    throw new Error(`Failed to fetch today's weather. Status: ${response.status}`)
  }

  const result = await response.json() as TodayData

  return result
}

export async function fetchLocation (q: string): Promise<LocationData[]> {
  const response = await fetch(`${env.serverUrl}/search?q=${encodeURIComponent(q)}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch location. Status: ${response.status}`)
  }

  const result = await response.json() as LocationData[]

  return result
}
