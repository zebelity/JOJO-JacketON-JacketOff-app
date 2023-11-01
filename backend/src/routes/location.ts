import express, { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
import dotenv from 'dotenv'
import { LocationData } from '../shared/types'

dotenv.config()

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  // console.log(process.env.WEATHER_API_KEY)
  (async () => {
    const { q } = req.query

    if (!q) {
      res.status(400).json({ error: 'Query parameter q is required.' })
      return
    }
    console.log({ q })
    const response = await axios.get('https://api.weatherapi.com/v1/search.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q
      }
    })
    const locationData = response.data as LocationData
    console.log({ locationData })
    return res.json(locationData)
  })().catch(error => {
    console.error((error as AxiosError).response?.data)
    console.error((error as Error).message)
    res.status(500).json({ error: 'An error occurred while fetching search location data.' })
  })
})

export const locationRouter = router
