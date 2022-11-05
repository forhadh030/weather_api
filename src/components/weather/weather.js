import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  /* API keys and url to connect to the weather server */
  /* Set unit to imperial in the URL */
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=68093c15320ac21195dad0a1f86b16c0`

  /* Interactive: connecting the server to search button */
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      // Empty string under search
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        {/* Interactive: listening to key strokes */}
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          {/* search icon(magnifying glass)!!
          Also: play around with height and width to adjust size logo ONLY */}
      <button onClick={searchLocation}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" 
      height="1.5em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
        </path>
        </svg></button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {/* ToFixed will change decimal to integer */}
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* app is empty if no location/zip code is entered */}
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
            <p>Feels Like</p>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
            <p>Humidity</p>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
            <p>Wind Speed</p>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
