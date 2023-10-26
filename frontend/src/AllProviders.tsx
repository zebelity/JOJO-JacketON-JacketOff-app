import { ReactNode } from 'react'
import { WeatherProvider } from 'contexts/WeatherContext.tsx'
import { LocationProvider } from 'contexts/LocationContext.tsx'
import { UserPreferenceProvider } from 'contexts/PreferenceContext.tsx'
import { NotificationProvider } from 'contexts/NotificationContext'

export default function AllProviders (props: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <WeatherProvider>
        <UserPreferenceProvider>
          <LocationProvider>
            {props.children}
          </LocationProvider>
        </UserPreferenceProvider>
      </WeatherProvider>
    </NotificationProvider>
  )
}
