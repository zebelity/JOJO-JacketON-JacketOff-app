import { createContext, useState, ReactNode, useEffect } from 'react';
import { WeatherData } from '@shared/types'
import { fetchWeather } from './api.ts'

interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData | null) => void;
}

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    (async () => {
      const result = await fetchWeather()
      console.log({ result })
      setWeather(result)
    })()
  }, [])

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

