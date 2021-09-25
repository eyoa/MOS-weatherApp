import { createContext, useContext } from 'react';

export const WeatherContext = createContext();

export function useWeather() {
  const weather = useContext(WeatherContext);
  return weather;
}
