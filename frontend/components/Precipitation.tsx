import { useWeather } from '../components/contexts/WeatherContext';

export default function Precipitation() {
  const data = useWeather();

  return (
    <>
      <h1>Precipitation Page</h1>
      <h2>This Week</h2>
      {data.daily.map((day, index) => {
        if (index > 6) return;
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short'
        });
        return (
          <tr>
            <td>{date}</td>
            <td>{Math.trunc(day.pop * 100)}%</td>
          </tr>
        );
      })}

      <h2>This month</h2>
    </>
  );
}
