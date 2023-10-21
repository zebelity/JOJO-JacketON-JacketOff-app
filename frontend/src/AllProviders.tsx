import { ReactNode } from 'react'
import { WeatherProvider } from 'contexts/WeatherContext.tsx'
import { LocationProvider } from 'contexts/LocationContext.tsx'
import { UserPreferenceProvider } from 'contexts/PreferenceContext.tsx'

export default function AllProviders (props: { children: ReactNode }) {
  return (
    <WeatherProvider>
      <UserPreferenceProvider>
        <LocationProvider>
          {props.children}
        </LocationProvider>
      </UserPreferenceProvider>
    </WeatherProvider>
  )
}
