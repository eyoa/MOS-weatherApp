import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// API Key call and data sent to props
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const query = 'Kansas';
const defaultEndpoint = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Home: NextPage = data => {
  console.log(data);
  return <h1>Landing</h1>;
};

export default Home;
