// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const query = 'Kansas';
const lat='33.44'
const lon='-94.04'

const defaultEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  }



export default function precipitation({data}) {
    const precipitations = data.daily.map(day => day.pop)
    console.log(data.daily)
    return <>
        <div>Precipitation Page</div>
        <div>{JSON.stringify(precipitations)}</div>
        
    </>
    
}