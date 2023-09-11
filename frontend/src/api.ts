
import type { Greeting,WeatherData } from '@shared/types'
import env from './env'

export async function getGreeting () {
  const response = await fetch(`${env.serverUrl}/greeting`)
  const result = await response.json() as Greeting

  return result
}

export async function fetchWeather() {
  const response = await fetch(`${env.serverUrl}/`)
  const result = await response.json() as WeatherData

  return result
}

