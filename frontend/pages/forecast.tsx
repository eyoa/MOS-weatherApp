import { NextPage } from "next";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const lat = 15;
const long = 15;
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&cnt=7&appid=${apiKey}&units=imperial`;

//------------------//
// Days of the week //
//------------------//
const weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
);

const currDate = new Date();
let nextDay = currDate.getDay() + 1;
let nextDay2 = currDate.getDay() + 2;
let nextDay3 = currDate.getDay() + 3;
let nextDay4 = currDate.getDay() + 4;
let nextDay5 = currDate.getDay() + 5;
let nextDay6 = currDate.getDay() + 6;


if (currDate.getDay() === 1) {
    nextDay6 = 0;
}
if (currDate.getDay() === 2) {
    nextDay5 = 0;
    nextDay6 = 1;
    
}if (currDate.getDay() === 3) {
    nextDay4 = 0;
    nextDay5 = 1;
    nextDay6 = 2;
}
if (currDate.getDay() === 4) {
    nextDay3 = 0;
    nextDay4 = 1;
    nextDay5 = 2;
    nextDay6 = 3;
}
if (currDate.getDay() === 5) {
    nextDay2 = 0;
    nextDay3 = 1;
    nextDay4 = 2;
    nextDay5 = 3;
    nextDay6 = 4;
}
if (currDate.getDay() === 6) {
    nextDay = 0;
    nextDay2 = 1;
    nextDay3 = 2;
    nextDay4 = 3;
    nextDay5 = 4;
    nextDay6 = 5;
}


export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

const Forecast: NextPage = data => {
    console.log(data);
    return (
        <>

            <h1>{data.data.timezone}</h1>
            <h1>Forecast</h1>
            <h3>Date: {currDate.toDateString()}</h3>
            <h3>Next 7 Days</h3>

            <h3>{weekdays[nextDay]}</h3>
            <div>Min {data.data.daily[0].temp.min}</div>
            <div>Max {data.data.daily[0].temp.max}</div>

            <h3>{weekdays[nextDay2]}</h3>
            <div>Min {data.data.daily[1].temp.min}</div>
            <div>Max {data.data.daily[1].temp.max}</div>

            <h3>{weekdays[nextDay3]}</h3>
            <div>Min {data.data.daily[2].temp.min}</div>
            <div>Max {data.data.daily[2].temp.max}</div>

            <h3>{weekdays[nextDay4]}</h3>
            <div>Min {data.data.daily[3].temp.min}</div>
            <div>Max {data.data.daily[3].temp.max}</div>

            <h3>{weekdays[nextDay5]}</h3>
            <div>Min {data.data.daily[4].temp.min}</div>
            <div>Max {data.data.daily[4].temp.max}</div>

            <h3>{weekdays[nextDay6]}</h3>
            <div>Min {data.data.daily[5].temp.min}</div>
            <div>Max {data.data.daily[5].temp.max}</div>

            <h3>{weekdays[currDate.getDay()]}</h3>
            <div>Min {data.data.daily[6].temp.min}</div>
            <div>Max {data.data.daily[6].temp.max}</div>

            <h1>Graph Here</h1>

        </>
  );
};

export default Forecast;
