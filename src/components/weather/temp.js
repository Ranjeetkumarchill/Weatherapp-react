import React,{useState,useEffect} from 'react';
import "./style.css";
import Weathercard from "./weathercard"
const Temp = () => {
const[searchValue,setSearchValue]=useState("patna");
const [tempInfo,setTempInfo]=useState({});
const getWeatherInfo=async()=>{
  try{
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a27b0398d5b89178572e7ebae16b454a`;
      let res= await fetch(url);
      let data=await res.json();
      const{temp,humidity,pressure}=data.main;
      const{main:weathermood}=data.weather[0];
      const{name}=data;
      const{speed}=data.wind;
      const{country,sunset}=data.sys;

      const myNewWeather={
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
      };
      setTempInfo(myNewWeather);
  } catch(error){
      console.log(error);
  }
};
useEffect(() => {
    getWeatherInfo();
}, []);


    return(<>
        <div className="wrap">
            <div className="search">
                <input type="search"
                placeholder="search.."
                autoFocus
                id="search"
                className="searchterm"
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value) }
                />
                <button className="searchButton" type="button" onClick={getWeatherInfo}> Search</button>
            </div>
            
        </div>
        {/* our temp card */}
        <Weathercard tempInfo={tempInfo}/>
        </> );
}

export default Temp
