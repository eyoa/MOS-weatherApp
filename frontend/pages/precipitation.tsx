const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const lat = '33.44';
const lon = '-94.04';

const defaultEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  };
}

export default function precipitation({ data }) {
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
