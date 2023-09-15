import { useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [displayLocation, setDisplayLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const getWeather = async function fetchWeather() {
    try {
      setIsLoading(true)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      if (!geoRes.ok)
        throw new Error("Something went wrong with fetching weather");

      const geoData = await geoRes.json();
      // console.log(geoData.results);
      if (!geoData.results) throw new Error("Location not found");

      //getting the data from the fetch request only the first index
      const { latitude, longitude, timezone, name } = geoData.results.at(0);

      setDisplayLocation(name);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} setLocation={setLocation} />
      <button onClick={getWeather}>Get Weather</button>
      <Weather displayLocation={displayLocation} isLoading={isLoading} weather={weather}/>
    </div>
  );
}

function Input({ location, setLocation }) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter country"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </>
  );
}

function Weather({ displayLocation, isLoading, weather }) {

  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;


  return (
    <>
    {isLoading && 
    <h2>Weather {displayLocation}</h2>}
    <ul className="weather">
      {dates.map((date, i) => (
        console.log(date)
      ))}
    </ul>
    </>
  )
}

function Day({ date, max, min, code, isToday }) {
  return (
    <>
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    </>
  );
}


export default App;
