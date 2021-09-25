import type { NextPage } from "next"

import Image from "next/image"
import styles from "../styles/Home.module.css"

import Today from "../components/Today"
import Precipitation from "../components/Precipitation"
import Forecast from "../components/forecast/Forecast"
import { WeatherContext } from "../components/contexts/WeatherContext"

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const lat = "33.44"
const lon = "-94.04"
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}&units=metric`

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}
const Home: NextPage = ({ data }) => {
  return (
    <WeatherContext.Provider value={data}>
      <h1>Landing</h1>

      <div className="screen-container">
        <Today />
        <Forecast />
        <Precipitation />
      </div>
    </WeatherContext.Provider>
  )
}

export default Home
