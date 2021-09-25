import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const lat = '33.44';
const lon = '-94.04';
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/onecall`;

const params = {
  appid: apiKey,
  units: 'metric',
  exclude: 'hourly',
  lat,
  lon
};

export async function getWeather() {
  const [weather, setWeather] = useState();
  console.log('called getWeather');
  let storedWeather = localStorage.getItem('weather');

  if (storedWeather === null) {
    axios
      .get(defaultEndpoint, { params })
      .then((res) => {
        localStorage.setItem('weather', res.data);
        setWeather(res.data);
        return weather;
      })
      .catch((e) => {
        console.log('API error', e);
      });
  } else {
    setWeather(storedWeather);
  }

  return weather;
}
