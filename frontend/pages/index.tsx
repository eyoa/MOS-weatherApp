import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

import Today from '../components/Today';
import Precipitation from '../components/Precipitation';
import Forecast from '../components/forecast/Forecast';
import { WeatherContext } from '../components/contexts/WeatherContext';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultEndpoint = (lat, lon, apiKey) =>
  `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`;

async function fetchData(pos, setData, setDisplaySearchBar) {
  const { data } = await axios.get(
    defaultEndpoint(pos.coords.latitude, pos.coords.longitude, apiKey)
  );
  setData(data);
  Object.keys(data).length && setDisplaySearchBar(false);
  console.log(data);
}

async function fetchDataFromCity(city, setData, setDisplaySearchBar, setTheme) {
  const { data: cityData } = await axios.get(
    `https://geocode.xyz/${city}?json=1`
  );
  console.log(cityData);
  const { data } = await axios.get(
    defaultEndpoint(cityData.latt, cityData.longt, apiKey)
  );
  setData(data);
  Object.keys(data).length && setDisplaySearchBar(false);

  // adjust theme
  const curTime = new Date(data.current.dt * 1000).getHours();
  if (curTime >= 20 || curTime < 6) {
    setTheme('dark');
  } else if (data.current.clouds > 50) {
    setTheme('cloudy');
  } else {
    setTheme('light');
  }
}

const Home: NextPage = () => {
  const [displaySearchbar, setDisplaySearchbar] = useState(true);
  const [data, setData] = useState({});
  const [city, setCity] = useState('');
  const [radio, setRadio] = useState({ value: 'Landing' });
  const [theme, setTheme] = useState('light');

  const handleChange = (event) => {
    const { value } = event.target;
    setRadio({ value });
    window.location.hash = '#' + value;
  };

  const themeObj = {
    light: styles.lightTheme,
    dark: styles.darkTheme,
    cloudy: styles.cloudyTheme
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchData(pos, setData, setDisplaySearchbar),
      () => console.log('fail')
    );
  }, []);

  function handleSearchClick() {
    console.log(city);
    fetchDataFromCity(city, setData, setDisplaySearchbar, setTheme);
  }

  return (
    <WeatherContext.Provider value={data}>
      <div className={`${styles.app} ${themeObj[theme]}`}>
        <div className={styles.header}>
          <div>Last updated: 10:41AM</div>
          <h1>Location</h1>
        </div>
        <div className={styles.wrap}>
          <div className={styles.slider}>
            {displaySearchbar && (
              <div className={styles.slide} id='Landing'>
                <h1>Landing</h1>
                <input onChange={(e) => setCity(e.target.value)}></input>
                <button onClick={handleSearchClick}>search</button>
              </div>
            )}
            {Object.keys(data).length && (
              <>
                <div className={styles.slide} id='Today'>
                  <Today />
                </div>

                <div className={styles.slide} id='Forecast'>
                  <Forecast />
                </div>

                <div className={styles.slide} id='Precipitation'>
                  <Precipitation />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.links}>
          <input
            type='radio'
            className='tabgroup'
            id='tab1'
            value='Landing'
            onChange={handleChange}
            checked={radio.value === 'Landing'}
          ></input>

          <label for='tab1'>Landing</label>
          <input
            type='radio'
            className='tabgroup'
            id='tab2'
            value='Today'
            onChange={handleChange}
            checked={radio.value === 'Today'}
          ></input>

          <label for='tab2'>Today</label>
          <input
            type='radio'
            className='tabgroup'
            id='tab3'
            value='Forecast'
            onChange={handleChange}
            checked={radio.value === 'Forecast'}
          ></input>

          <label for='tab3'>Forecast</label>
          <input
            type='radio'
            className='tabgroup'
            id='tab4'
            value='Precipitation'
            onChange={handleChange}
            checked={radio.value === 'Precipitation'}
          ></input>

          <label for='tab4'>Precipitation</label>
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default Home;
