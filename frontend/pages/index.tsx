import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

import Today from '../components/Today';
import Precipitation from '../components/Precipitation';
import Forecast from '../components/forecast/Forecast';
import { WeatherContext } from '../components/contexts/WeatherContext';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const defaultEndpoint = (lat, lon, apiKey) =>
  `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}&units=metric`;

async function fetchData(pos, setData, setDisplaySearchBar) {
  const { data } = await axios.get(
    defaultEndpoint(pos.coords.latitude, pos.coords.longitude, apiKey)
  );
  setData(data);
  Object.keys(data).length && setDisplaySearchBar(false);
  console.log(data);
}

async function fetchDataFromCity(city, setData, setDisplaySearchBar) {
  const { data: cityData } = await axios.get(
    `https://geocode.xyz/${city}?json=1`
  );
  console.log(cityData);
  const { data } = await axios.get(
    defaultEndpoint(cityData.latt, cityData.longt, apiKey)
  );
  setData(data);
  Object.keys(data).length && setDisplaySearchBar(false);
  console.log(data);
}

const Home: NextPage = () => {
  const [displaySearchbar, setDisplaySearchbar] = useState(true);
  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchData(pos, setData, setDisplaySearchbar),
      () => console.log('fail')
    );
  }, []);

  function handleSearchClick() {
    console.log(city);
    fetchDataFromCity(city, setData, setDisplaySearchbar);
  }

  return (
    <WeatherContext.Provider value={data}>
      <div className={styles.app}>
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
          <div className={styles.links}>
            <a href='#Landing'>O</a>
            <a href='#Today'>O</a>
            <a href='#Forecast'>O</a>
            <a href='#Precipitation'>O</a>
          </div>
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default Home;
