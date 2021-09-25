import type { NextPage } from 'next';

import styles from '../styles/Home.module.css';

import Today from '../components/Today';
import Precipitation from '../components/Precipitation';
import Forecast from './../components/Forecast';
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
