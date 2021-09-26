import * as React from "react"
import styles from "../../styles/Forecast.module.css"

interface props {
  day: string
  minTemp: number
  maxTemp: number
}

const DailyTemp: React.FC<props> = ({ day, minTemp, maxTemp }) => {
  return (
    <div className={styles.forecast_container}>
      <p className={styles.forecast_days}>{day}</p>
      <div className={styles.forecast_temp}>
        <p>{minTemp}</p>
        <div
          className={styles.forecast_temp_bars}
          style={{
            width: `${(maxTemp - minTemp) * 12}px`
          }}
        ></div>
        <p>{maxTemp}</p>
      </div>
    </div>
  )
}

export default DailyTemp
