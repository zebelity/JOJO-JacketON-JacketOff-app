export type WeatherForecastDay = {
  date: string
  date_epoch: number
  day: {
    avgtemp_c: number
    avgtemp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
}

export type WeatherData = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  },
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    // 6 days - today + 5 day forecast
    forecastday: [
      WeatherForecastDay,
      WeatherForecastDay,
      WeatherForecastDay,
      WeatherForecastDay,
      WeatherForecastDay,
      WeatherForecastDay
    ]
  }
  alerts: {
    alert: Array<{
      headline: string
      areas: string
      event: string
      instruction: string
    }>
  }
}

export type TodayData = {
  location: {
    name: string
  },
  astronomy: {
    astro: {
      sunrise: string
      sunset: string
    }
  }
}