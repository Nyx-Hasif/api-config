"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { WiWindDeg } from "react-icons/wi";

const Page = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // dont forget to environment this api !!!!!!!!!!!!!!!!!!!!
  const city = "malaysia";

  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [postId, setPostId] = useState(city);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${postId}&appid=${API_KEY}&units=metric`);
      const json = await response.json();
      if (json.cod === "404") {
        alert("City not found");
        return; // stop running if city not found
      }
      setData(json);
    } catch (error) {
      console.log("error:", error);
    }
  };

//   console.log(data);

  const handleSubmit =(e) => {
    e.preventDefault();
    if(postId){
      fetchWeather();
      setPostId('');
    }
  }

  useEffect(() => {
    fetchWeather();
    setPostId('');
  }, []);

  // timezone
  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        const now = new Date();
        // Adjust for timezone offset
        const adjustedTime = new Date(
          now.getTime() + data.city.timezone * 1000
        );
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
    <div className="flex flex-1 flex-col gap-8 h-screen overflow-auto border-2 border-black py-4 px-4">
      <div className="border-2 border-black text-center">
        <h1 className="text-2xl">Forecast 5 days:</h1>
      </div>

      <div>
        <h1 className="text-2xl">Location : {data?.city?.name || "Loading..."} </h1>
        <h1 className="text-2xl">Timezone : {currentTime || "Loading..."}</h1>
      </div>

      <div className="flex md:flex-row justify-start overflow-x-auto flex-col gap-4 md:gap-8 border-2 border-black px-4 py-4">
        {data? 
          data.list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center border border-red-600 px-4 py-4 md:min-w-[300px] text-xl "
            >
              <p>Date :{item.dt_txt}</p>
              <Image
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt="image"
                width={60}
                height={60}
              />
              <p>Temp : {item.main.temp}&deg;C</p>
              <p>Feels_like : {item.main.feels_like}&deg;C</p>
              <p>Pressure : {item.main.pressure}hPa</p>
              <p>Humidity : {item.main.humidity}%</p>
              <WiWindDeg
                className="text-4xl"
                style={{ transform: `rotate(${item.wind.deg}deg)` }}
              />
              <p>Wind : {item.wind.speed}m/s</p>
            </div>
          )): <div className="text-2xl mx-auto">Loading...</div>}
      </div>

      <div>
        <form
          action=""
          className="border-2 border-black px-4 py-4 flex md:flex-row flex-col gap-4 max-w-[400px]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="border-2 border-black py-2  rounded-full px-6 outline-none"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="border-2 border-black py-2 px-2 rounded-full">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
