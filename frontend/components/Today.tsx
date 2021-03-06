import { useWeather } from '../components/contexts/WeatherContext';
import styles from '../styles/Today.module.css';
import Image from 'next/image';

export default function Today() {
  const data = useWeather();
  const daytemps = data.daily[0].temp;
  const iconPath = `/` + data.current.weather[0].icon + `.png`;


  const mornW = data.hourly.find((hourObj) => {
    const hourTime = new Date(hourObj.dt * 1000).getHours();
    if (hourTime === 8) return hourObj;
  });

  const noonW = data.hourly.find((hourObj) => {
    const hourTime = new Date(hourObj.dt * 1000).getHours();
    if (hourTime === 12) return hourObj;
  });

  const afternoonW = data.hourly.find((hourObj) => {
    const hourTime = new Date(hourObj.dt * 1000).getHours();
    if (hourTime === 16) return hourObj;
  });

  const eveW = data.hourly.find((hourObj) => {
    const hourTime = new Date(hourObj.dt * 1000).getHours();
    if (hourTime === 21) return hourObj;
  });

  return (
    <div className={styles.content}>
      <div className={styles.currentBanner}>
        <div className={styles.pageTitle}>
          <h1>Today</h1>

          <div className={styles.date}>
            {new Date(data.current.dt * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className={styles.currentTemp}>
            <h3>
              {Math.round(data.current.temp)} <span>°C</span>
            </h3>
          </div>
        </div>
        <div className={styles.icon}>
          <Image
            src={iconPath}
            alt={data.current.weather[0].main}
            width={200}
            height={200}
          ></Image>
        </div>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>
              <b>Morning</b>
            </td>
            <td>
              <Image
                src={`/` + mornW.weather[0].icon + `.png`}
                alt={data.current.weather[0].main}
                width={40}
                height={40}
              ></Image>
            </td>
            <td>{Math.floor(daytemps.morn)}°C</td>
          </tr>
          <tr>
            <td>
              <b>Noon</b>
            </td>
            <td>
              <Image
                src={`/` + noonW.weather[0].icon + `.png`}
                alt={data.current.weather[0].main}
                width={40}
                height={40}
              ></Image>
            </td>
            <td>{Math.floor(daytemps.day)}°C</td>
          </tr>
          <tr>
            <td>
              <b>Afternoon</b>
            </td>
            <td>
              <Image
                src={`/` + afternoonW.weather[0].icon + `.png`}
                alt={data.current.weather[0].main}
                width={40}
                height={40}
              ></Image>
            </td>
            <td>{Math.floor(daytemps.eve)}°C</td>
          </tr>
          <tr>
            <td>
              <b>Evening</b>
            </td>
            <td>
              <Image
                src={`/` + eveW.weather[0].icon + `.png`}
                alt={data.current.weather[0].main}
                width={40}
                height={40}
              ></Image>
            </td>
            <td>{Math.floor(daytemps.night)}°C</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.slideContainer}>
        <div className={styles.wrap}>
          <div className={styles.slider}>
            {data.daily.map((day, index: number) => {
              if (index === 0) return;
              const dayOfWeek = new Date(day.dt * 1000).toLocaleDateString(
                'en-US',
                {
                  weekday: 'short'
                }
              );
              return (
                <div className={styles.daySummary}>
                  <div className={styles.dayOfWeek}>{dayOfWeek}</div>
                  <div>
                    <Image
                      src={`/` + day.weather[0].icon + `.png`}
                      alt={day.weather[0].main}
                      width={60}
                      height={60}
                    ></Image>
                  </div>

                  <div className={styles.maxMinTemp}>
                    <div>{Math.round(day.temp.min)}°</div>
                    <div>{Math.round(day.temp.max)}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
