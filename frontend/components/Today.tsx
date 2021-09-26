import { useWeather } from '../components/contexts/WeatherContext';
import styles from '../styles/Page.module.css';

export default function Today() {
  const data = useWeather();
  console.log(`today page data is ${data}`);
  const daytemps = data.daily[0].temp;
  return (
    <div>
      <h1>Today</h1>
      <h3>
        {new Date(data.current.dt * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </h3>
      <h3>{data.current.temp}</h3>
      <h3>{data.current.weather[0].main}</h3>

      <tr>
        <td>Morning</td>
        <td>{Math.floor(daytemps.morn)}C</td>
      </tr>
      <tr>
        <td>Noon</td>
        <td>{Math.floor(daytemps.day)}C</td>
      </tr>
      <tr>
        <td>Afternoon</td>
        <td>{Math.floor(daytemps.eve)}C</td>
      </tr>
      <tr>
        <td>Evening</td>
        <td>{Math.floor(daytemps.night)}C</td>
      </tr>

      {data.daily.map((day, index: number) => {
        if (index > 2) return;
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short'
        });
        return (
          <>
            <h3>{date}</h3>
            <div>{day.weather[0].main}</div>
            <tr>
              <td>Min</td>
              <td>{day.temp.min}</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>{day.temp.max}</td>
            </tr>
          </>
        );
      })}
    </div>
  );
}
