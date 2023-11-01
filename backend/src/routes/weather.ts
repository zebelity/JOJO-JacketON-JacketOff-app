import express, { Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import { WeatherData } from '../shared/types'

dotenv.config()

const router = express.Router()

function isLocalIp (ip: string): boolean {
  return ip === '::1' || ip === '127.0.0.1'
}

router.get('/', (req: Request, res: Response) => {
  (async () => {
    // console.log(process.env.WEATHER_API_KEY)
    const userIpAddress = (req.headers['true-client-ip'] ?? req.ip) as string
    const location = req.query.location
    // location = 'boston' //to test alert
    if (location === undefined) {
      // Use the user's IP address for IP lookup

      // console.log({ userIpAddress })

      // Make a request to the weather API with the user's IP address
      const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: isLocalIp(userIpAddress) ? 'auto:ip' : userIpAddress, // auto:ip is for local dev
          days: 6,
          alerts: 'yes'
        }
      })
      const weatherData = response.data as WeatherData
      console.log({ weatherData })
      res.json(weatherData)
      return
    }

    // If the location is not "auto:ip," assume it's a city or location name
    // Continue with the existing logic to fetch weather based on the specified location

    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: location,
        days: 6,
        alerts: 'yes'
      }
    })

    const weatherData = response.data as WeatherData
    console.log({ weatherData })
    res.json(weatherData)
  })().catch(error => {
    console.error((error as Error).message)
    res.status(500).json({ error: 'An error occurred while fetching weather data.' })
  })
})

router.get('/today', (req: Request, res: Response) => {
  (async () => {
    const userIpAddress = (req.headers['true-client-ip'] ?? req.ip) as string

    const location = req.query.location

    if (location === undefined) {
      const response = await axios.get('https://api.weatherapi.com/v1/astronomy.json', {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: isLocalIp(userIpAddress) ? 'auto:ip' : userIpAddress // auto:ip is for local dev
        }
      })
      const weatherData = response.data as WeatherData
      console.log({ weatherData })
      return res.json(weatherData)
    }

    const response = await axios.get('https://api.weatherapi.com/v1/astronomy.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: location
      }
    })

    const weatherData = response.data as WeatherData
    console.log({ weatherData })
    res.json(weatherData)
  })().catch(error => {
    console.error((error as Error).message)
    res.status(500).json({ error: 'An error occurred while fetching weather data.' })
  })
})

export const weatherRouter = router
