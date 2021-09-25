import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
import DailyTemp from "../components/DailyTemp"

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const lat = 15
const long = 15
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&cnt=7&appid=${apiKey}&units=imperial`

//------------------//
// Days of the week //
//------------------//
const weekdays = new Array("Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat")

// const currDate = new Date();
// let nextDay = currDate.getDay() + 1;
// let nextDay2 = currDate.getDay() + 2;
// let nextDay3 = currDate.getDay() + 3;
// let nextDay4 = currDate.getDay() + 4;
// let nextDay5 = currDate.getDay() + 5;
// let nextDay6 = currDate.getDay() + 6;

// if (currDate.getDay() === 1) {
//     nextDay6 = 0;
// }
// if (currDate.getDay() === 2) {
//     nextDay5 = 0;
//     nextDay6 = 1;

// }if (currDate.getDay() === 3) {
//     nextDay4 = 0;
//     nextDay5 = 1;
//     nextDay6 = 2;
// }
// if (currDate.getDay() === 4) {
//     nextDay3 = 0;
//     nextDay4 = 1;
//     nextDay5 = 2;
//     nextDay6 = 3;
// }
// if (currDate.getDay() === 5) {
//     nextDay2 = 0;
//     nextDay3 = 1;
//     nextDay4 = 2;
//     nextDay5 = 3;
//     nextDay6 = 4;
// }
// if (currDate.getDay() === 6) {
//     nextDay = 0;
//     nextDay2 = 1;
//     nextDay3 = 2;
//     nextDay4 = 3;
//     nextDay5 = 4;
//     nextDay6 = 5;
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  const { timezone, daily } = data
  return {
    props: {
      timezone,
      daily
    }
  }
}

const getDay = (day: number) => {
  const utc = day * 1000
  return new Date(utc).getDay()
}

const Forecast: NextPage = ({
  timezone,
  daily
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1>{timezone}</h1>
      {daily.map((day: { dt: number; temp: { max: number; min: number } }) => (
        <DailyTemp
          key={day.dt}
          maxTemp={day.temp.max}
          minTemp={day.temp.min}
          day={weekdays[getDay(day.dt)]}
        />
      ))}
      <h1>Graph Here</h1>
    </>
  )
}

export default Forecast
