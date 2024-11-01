'use client'
import { asset } from '@/public/asset';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // dont forget to environment this api !!!!!!!!!!!!!!!!!!!!
  const city = "Singapore";
  const [data,setData] = useState(null);
  const [place,setPlace] = useState('');
  const [location,setLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`);
      const json = await response.json();
      if(json.cod === '404'){
        alert('City not found');
        return;  // stop running if city not found
      }
      setData(json);
    } catch (error) {
      console.log("error:", error);
       alert("An error occurred while fetching weather data");
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(place){
      fetchWeather();
      setLocation(place)
      setPlace('');

    }
  }

useEffect(() => {
  const initialCity = 'Kota Bharu';
  setPlace(initialCity);
  setLocation(initialCity);
  setPlace('');
  
  const fetchInitialWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${initialCity}&appid=${API_KEY}&units=metric`);
      const json = await response.json();
      if (json.cod === '404') {
        alert('City not found');
        return;
      }
      setData(json);
    } catch (error) {
      console.log("error:", error);
      alert("An error occurred while fetching weather data");
    }
  };

  fetchInitialWeather();
}, []);

// timezone
useEffect(() => {
  const interval = setInterval(() => {
    if (data) {
      const now = new Date();
      // Adjust for timezone offset
      const adjustedTime = new Date(now.getTime() + data.timezone * 1000);
      const formatted = adjustedTime.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
      setCurrentTime(formatted);
    }
  }, 1000); // Update setiap saat

  return () => clearInterval(interval);
}, [data]);


  return (
    <div className="flex flex-1 flex-col border-2 justify-start h-screen  items-center gap-6 overflow-auto border-black py-12 px-12">
      <div>
        <h1 className="text-4xl font-bold">
          {`Current Weather Data in `}{" "}
          <span className="text-red-500 capitalize">{location}</span>
          <span className="text-red-500 "> {currentTime || "Loading..."} </span>
        </h1>
      </div>
      {/* parent */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* child */}
        <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
          <h1 className="text-2xl font-medium">Temperature</h1>
          <p className="text-2xl ">{data?.main?.temp}°C</p>
        </div>
        <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
          <h1 className="text-2xl font-medium">Humidity</h1>
          <p className="text-2xl ">{data?.main?.humidity}%</p>
        </div>
        <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
          <h1 className="text-2xl font-medium">Pressure</h1>
          <p className="text-2xl ">{data?.main?.pressure} hPa</p>
        </div>
        <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
          <h1 className="text-2xl font-medium">Wind</h1>
          <p className="text-2xl ">{data?.wind?.speed} m/s</p>
        </div>
        <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
          <h1 className="text-2xl font-medium">Feels like</h1>
          <p className="text-2xl ">{data?.main?.feels_like}°C</p>
        </div>
      </div>

      {/* Weather */}
      <div className="flex flex-col text-center border-2 h-max gap-4 border-black py-8 px-8">
        <h1 className="text-2xl font-medium">Weather</h1>
        <p className="text-2xl ">{data?.weather[0]?.main}</p>
        <p className="text-2xl ">{data?.weather[0]?.description}</p>
        <Image
          src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
          alt={data?.weather[0]?.description || "weather icon"}
          width={100}
          height={100}
          className='mx-auto'
        />
      </div>

      {/* data from OpenWeather */}
      <div>
        <h2>
          Data weather API from OpenWeather <Link href="https://openweathermap.org/current" className='text-red-500 underline'>https://openweathermap.org/current</Link>
        </h2>
      </div>

      {/* form search country */}
      <div>
        <form onSubmit={handleClick} className="flex gap-2">
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="border-2 border-black pl-4 outline-none  py-2 px-2 rounded-lg"
            placeholder="place"
          />
          <button className="border-2 border-black py-2 px-2 rounded-md">
            Search
          </button>
        </form>
      </div>
      {/* image */}
      <div className="flex flex-col gap-4">
        <h1>Fetch API method request</h1>
        <Image src={asset.fetch_Weather} alt={"image fetchweather"} />
        <h1>Chain example for render data from API</h1>
        <Image src={asset.chain} alt={"image chain"} />
        <Image src={asset.chain_example} alt={"image ex chain"} />
        <h1>date format follow in API timezone below</h1>
        <Image src={asset.date_format} alt={"date format"} />
        <Image src={asset.date_full} alt={"date fullcode"} />
        <h1>Below Realtime Date Below..Using below kerana setInterval 1s</h1>
        <Image src={asset.realtime_date} alt={"Realtime date"} />
      </div>
    </div>
  );
}

export default Page
