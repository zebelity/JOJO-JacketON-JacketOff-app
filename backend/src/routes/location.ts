import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  // console.log(process.env.WEATHER_API_KEY)
  try {
    const { q } = req.query

    console.log({ q })

    const response = await axios.get('https://api.weatherapi.com/v1/search.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q
      }
    })
    const locationData = response.data;
    console.log({ locationData })
    return res.json(locationData)
  } catch (error) {
    console.error((error as AxiosError).response?.data)
    console.error((error as Error).message)
    res.status(500).json({ error: 'An error occurred while fetching search location data.' });
  }
})

export const locationRouter = router