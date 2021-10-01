import type { NextPage } from 'next';
import { useState } from 'react';

import styles from '../styles/Home.module.css';

import Today from '../components/Today';
import Precipitation from '../components/Precipitation';
import Forecast from '../components/forecast/Forecast';
import { WeatherContext } from '../components/contexts/WeatherContext';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const lat = '33.44';
const lon = '-94.04';
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}&units=metric`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}
const Home: NextPage = ({ data }) => {
  const [radio, setRadio] = useState({ value: 'Landing' });

  const handleChange = (event) => {
    const { value } = event.target;
    setRadio({ value });
  };

  return (
    <WeatherContext.Provider value={data}>
      <div className={styles.app}>
        <div className={styles.header}>
          <div>Last updated: 10:41AM</div>
          <h1>Location</h1>
        </div>
        <div className={styles.wrap}>
          <div className={styles.slider}>
            <div className={styles.slide} id='Landing'>
              <h1>Landing</h1>
            </div>

            <div className={styles.slide} id='Today'>
              <Today />
            </div>

            <div className={styles.slide} id='Forecast'>
              <Forecast />
            </div>

            <div className={styles.slide} id='Precipitation'>
              <Precipitation />
            </div>
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

          <label for='tab1'>
            <a href='#Landing'>Landing</a>
          </label>
          <input
            type='radio'
            className='tabgroup'
            id='tab2'
            value='Today'
            onChange={handleChange}
            checked={radio.value === 'Today'}
          ></input>

          <label for='tab2'>
            <a href='#Today'>Today</a>
          </label>
          <input
            type='radio'
            className='tabgroup'
            id='tab3'
            value='Forecast'
            onChange={handleChange}
            checked={radio.value === 'Forecast'}
          ></input>

          <label for='tab3'>
            <a href='#Forecast'>Forecast</a>
          </label>
          <input
            type='radio'
            className='tabgroup'
            id='tab4'
            value='Precipitation'
            onChange={handleChange}
            checked={radio.value === 'Precipitation'}
          ></input>

          <label for='tab4'>
            <a href='#Precipitation'>Precipitation</a>
          </label>
        </div>
      </div>
    </WeatherContext.Provider>
  );
};

export default Home;
