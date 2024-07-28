import React, { useState } from 'react';
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits, searchHistory }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col justify-center my-6">
      <div className="flex flex-row w-full items-center justify-center space-x-4">
        <div className="relative w-3/4">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text"
            placeholder="Search by city..."
            className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
          />
          {city && (
            <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-md z-10">
              {searchHistory.filter(h => h.includes(city.toLowerCase())).map((h, index) => (
                <div key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => setCity(h)}>
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
        <BiSearch size={30} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
        <BiCurrentLocation size={30} className="cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
      </div>
      <div className="flex flex-row w-full items-center justify-center mt-4">
        <button className="text-2xl font-medium transition ease-out hover:scale-125" onClick={() => setUnits('metric')}>°C</button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button className="text-2xl font-medium transition ease-out hover:scale-125" onClick={() => setUnits('imperial')}>°F</button>
      </div>
    </div>
  );
}

export default Inputs;
