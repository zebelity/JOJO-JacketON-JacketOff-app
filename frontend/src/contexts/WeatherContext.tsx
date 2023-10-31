import { createContext, useState, ReactNode, useEffect, useContext } from 'react'
import { WeatherData } from '@shared/types'
import { fetchWeather } from '../api.ts'
import { LocationContext } from './LocationContext.tsx'

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
}

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  setWeather: () => {}
})

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  // We ask LocationContext for the selected location
  const { selectedLocation } = useContext(LocationContext)

  // Any time selectedLocation changes, we want to update
  // the weather for that location
  useEffect(() => {
    (async () => {
      if (selectedLocation === null) {
        // No user preference yet, so don't try to fetch weather
        setWeather(null)
      } else if (selectedLocation.type === 'AUTO_DETECT') {
        // Don't send a location to backend
        // Backend will use the user's IP to detect location
        const result = await fetchWeather()
        console.log({ selectedLocation, result })
        setWeather(result)
      } else {
        // User has selected a specific location
        // So we fetch weather for that location
        const result = await fetchWeather(selectedLocation.location)
        console.log({ selectedLocation, result })
        setWeather(result)
      }
    })().catch(err => { console.log(err) })
  }, [selectedLocation])

  const contextValue: WeatherContextType = {
    weather,
    setWeather
  }

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )
}
