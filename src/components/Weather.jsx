
import search from '../assts/search.png'
import humadity from '../assts/humidity.png'
import wind from '../assts/wind.png'
import { useEffect, useRef, useState } from 'react'

function Weather() {
  const [weather,setWeather] =useState(false)
  const inputRef = useRef(null)

  const getWeather = async (city) =>{
       console.log(city)

       if (city === ""){
        setWeather(false)
        alert("please enter valid city")
        return
       }

       const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}`;

       const response = await fetch(url)

       const data = await response.json()
       console.log(data)

       setWeather({
        humidity : data.current.humidity,
        wind :data.current.wind_kph,
        location:data.location.name,
        country:data.location.country,
        tempreture : data.current.temp_c,
        icon:"https" + data.current.condition.icon,
        text: data.current.condition.text
       })
  }

  useEffect(()=>{
    getWeather("Dhaka")

  },[]);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <h2 className='text'>Search Your City</h2>
      
        <input ref={inputRef} type='text' placeholder='Search The City'/>
        <img  src={search} alt='search' onClick={()=>getWeather(inputRef.current.value)} />
      </div>
        
       {weather ? (
        <div className='value'>
          <img src={weather.icon} alt=''/>
          <h2>{weather.text}</h2>
          <p className='tempreture'>{weather.tempreture}°</p>
          <p className='location'>{weather.location}, {weather.country}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humadity} alt='humadity'/>
              <div>
                <p>Humadity</p>
                <span>{weather.humidity} % </span>
              </div>
            </div>
            <div className='col'>
              <img src={wind} alt='humadity'/>
              <div>
                <p>Humadity</p>
                <span>7{weather.wind} %</span>
              </div>
            </div>
          </div>
        </div>

       ): <h2>Loading ...</h2>
       }
        
    </div>
  )
}

export default Weather