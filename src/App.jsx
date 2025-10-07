import React, { useEffect, useRef, useState } from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { TiWeatherWindy } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { WiDaySunny } from "react-icons/wi";
import { FaCloud } from "react-icons/fa";
import { BsCloudDrizzle } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { BsSnow2 } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";


const App = () => {

  const [weather, setWeather] = useState(false)

  const inputRef = useRef()

  const allIcons = {
    "01d": <WiDaySunny />,
    "01n": <WiDaySunny />,
    "02d": <FaCloud />,
    "02n": <FaCloud />,
    "03d": <FaCloud />,
    "03n": <FaCloud />,
    "04d": <BsCloudDrizzle />,
    "04n": <BsCloudDrizzle />,
    "09d": <BsCloudLightningRain />,
    "09n": <BsCloudLightningRain />,
    "010d": <BsCloudLightningRain />,
    "010n": <BsCloudLightningRain />,
    "013d": <BsSnow2 />,
    "013n": <BsSnow2 />,
  }

  const search = async (city) => {

    if (city === "") {
      toast.warn("Please enter a city name!");
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || <WiDaySunny />

      setWeather({
        humidity: data.main.humidity,
        speed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);


  return (
    <>
      <div className='min-h-screen grid bg-blue-200 place-items-center'>
        <div className='rounded-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 flex-col flex items-center justify-center'>
          <div className='flex justify-between mt-5'>
            <TiWeatherPartlySunny className='text-5xl ml-10 mt-2 text-white' />
            <div className='flex h-11 outline-none rounded-full bg-slate-300 pl-5 mr-25 mt-2 ml-10'>
              <input className='outline-none' type="search" placeholder='Search Location' ref={inputRef} />
              <button className=" text-white h-11 w-11 bg-blue-400 rounded-full place-items-center hover:cursor-pointer hover:scale-120 transition-all" onClick={() => search(inputRef.current.value)}  ><CiSearch className='text-2xl' /></button>
            </div>
          </div>

          <div className="text-[15rem] text-yellow-200 mb-5">{weather.icon}</div>
          <p className='text-amber-50 text-7xl'>{weather.temp}°C</p>
          <p className='text-amber-50 text-3xl mb-6 '>{weather.location}</p>

          <div className='flex w-[60%] mb-7 text-white justify-between text-center'>
            <div>
              <TiWeatherWindy className='text-4xl ml-4' />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div>
              <TiWeatherWindyCloudy className='text-4xl ml-5' />
              <div>
                <p>{weather.speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </>
  )
}

export default App