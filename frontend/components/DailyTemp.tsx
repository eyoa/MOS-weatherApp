import * as React from "react"

interface props {
  day: string
  minTemp: number
  maxTemp: number
}

const DailyTemp: React.FC<props> = ({ day, minTemp, maxTemp }) => {
  return (
    <div
      style={{
        width: "400px",
        display: "flex"
      }}
    >
      <p
        style={{
          width: "50px"
        }}
      >
        {day}
      </p>
      <div
        style={{
          display: "flex",
          width: "350px"
        }}
      >
        <p>{minTemp}</p>
        <div
          style={{
            height: "14px",
            width: `${(maxTemp - minTemp) * 12}px`,
            backgroundColor: "#000",
            margin: "18px 14px",
            borderRadius: "10px"
          }}
        ></div>
        <p>{maxTemp}</p>
      </div>
    </div>
  )
}

export default DailyTemp
