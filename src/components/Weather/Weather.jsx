import React, { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [search, setSearch] = useState("Kathmandu");
  const [data, setData] = useState("Loading");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        // const response = await fetch(
        //   "http://localhost/php-api/?latitude=" +
        //     lat +
        //     "&longitude=" +
        //     lon,
        //   {
        //     method: "GET",
        //   }
        // );
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9901b5c392c571b5ea4f13e19e7cc7df`
        )
          .then((res) => res.json())
          .then((data) => setData(data));

          
      });
    } else {
      alert("Geolocation is not available");
    }

  }, []);
  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9901b5c392c571b5ea4f13e19e7cc7df`
    );
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="container mt-5 p-5">
      <div className="wrapper shadow p-5">
        <form action="">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="form-control"
          />
        </form>
        {!data.name ? (
          "No data found"
        ) : (
          <div className="info">
            <h1>
              {data.name} {data.sys.country}
            </h1>
            <h6>{data.main.temp}C </h6>
            <h6>Max Temp: {data.main.temp_max}C</h6>
            <h6>Min temp: {data.main.temp_min}C</h6>
            <h6>Wind: {data.wind.speed}Kmph</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;

