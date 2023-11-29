import { useState } from 'react';
import { useRef } from 'react';

import WeekForecast from './WeekForecast';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [selectedLocationWeather, setSelectedLocationWeather] = useState(undefined);
  const [locations, setLocations] = useState([
    {
      name: 'Tallinn',
      latitude: 59.4370,
      longitude: 24.7536,
    },
    {
      name: 'Bali',
      latitude: -8.4095,
      longitude: 115.1889,
    },
    {
      name: 'Rovaniemi',
      latitude: 66.5039,
      longitude: 25.7294,
    },
  ]);
  const newNameRef = useRef(null);
  const newLongitudeRef = useRef(null);
  const newLatitudeRef = useRef(null);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    getLocationData(location);
  }

  const addLocation = () => {
    if (newNameRef.current.value === '') {
      newNameRef.current.focus();
      return;
    }
    if (newLongitudeRef.current.value === '' || isNaN(newLongitudeRef.current.value)) {
      newLongitudeRef.current.focus();
      return;
    }
    if (newLatitudeRef.current.value === '' || isNaN(newLatitudeRef.current.value)) {
      newLatitudeRef.current.focus();
      return;
    }
    setLocations([...locations,
    {
      name: newNameRef.current.value,
      latitude: newLatitudeRef.current.value,
      longitude: newLongitudeRef.current.value,
    }
    ]);
    newNameRef.current.value = '';
    newLatitudeRef.current.value = '';
    newLongitudeRef.current.value = '';
  }

  const getLocationData = async (location) => {
    setIsLoading(true);
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?timezone=auto&latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max`);
    const dataJson = await data.json();
    setIsLoading(false);
    console.log(dataJson);
    setSelectedLocationWeather(dataJson);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'row', gap: 24, padding: 24 }}>
        <div style={{ borderRight: '1px solid gray', padding: '0 24px 0 0' }}>
          <h3>Asukohad</h3>
          {locations.map((location) => (
            <div key={location.name}>
              <a onClick={() => selectLocation(location)}>{location.name}</a>
            </div>
          ))}

          <h3>New location</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input ref={newNameRef} placeholder='Name' />
            <input ref={newLongitudeRef} placeholder='Longitude' />
            <input ref={newLatitudeRef} placeholder='Latitude' />
            <button onClick={() => addLocation()}>Add location</button>
          </div>

        </div>
        <div style={{ textAlign: 'left' }}>
          {selectedLocation && selectedLocationWeather && selectedLocationWeather.daily ? (
            <>
              <h3>Ilmateade</h3>
              <div>
                <div>{selectedLocation.name}</div>

                {isLoading ? 'Laen...' : (

                  <div>
                    <div>Asukohas {selectedLocation.name} on {selectedLocationWeather.current.temperature_2m}{selectedLocationWeather.current_units.temperature_2m}.</div>

                    <WeekForecast dailyData={selectedLocationWeather.daily} dailyUnits={selectedLocationWeather.daily_units} />

                  </div>
                )}

              </div>
            </>
          ) : (
            <>
              <h3>Ilmateadet ei ole</h3>
              <div>Ilmateate vaatamiseks vali linn!</div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;