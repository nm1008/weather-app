import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState("");

 
    const getWeather = async function fetchWeather() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        if (!geoRes.ok)
          throw new Error("Something went wrong with fetching weather");

        const geoData = await geoRes.json();
        console.log(geoData.results);
        if(!geoData.results) throw new Error("Location not found")
          


      } catch (err) {
        console.log(err);
      }
    }
  
  
  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} setLocation={setLocation} />
      <button onClick={getWeather}>Get Weather</button>
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

export default App;
