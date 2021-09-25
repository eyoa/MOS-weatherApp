import { NextPage } from 'next';

import { useWeather } from '../components/contexts/WeatherContext';

import DailyTemp from '../components/DailyTemp';

const weekdays = new Array('Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat');

const getDay = (day: number) => {
  const utc = day * 1000;
  return new Date(utc).getDay();
};

const Forecast: NextPage = () => {
  const data = useWeather();

  const timezone = data.timezone;
  const daily = data.daily;

  return (
    <>
      <h1>{timezone}</h1>
      {daily.map(
        (day: {
          dt: number;
          temp: { max: number; min: number };
          td: number;
        }) => (
          <DailyTemp
            key={day.dt}
            maxTemp={day.temp.max}
            minTemp={day.temp.min}
            day={weekdays[getDay(day.dt)]}
          />
        )
      )}
      <h1>Graph Here</h1>
    </>
  );
};

export default Forecast;
