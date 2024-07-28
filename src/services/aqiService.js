import React from 'react'
const API_KEY = '39784c30946d59da4da1dea1d8c3b5e7';

const getAirQualityIndex = async (city) => {
  const response = await fetch(`https://api.airvisual.com/v2/city?city=${city}&key=${API_KEY}`);
  const data = await response.json();
  return data.data.current.pollution.aqius; // Adjust based on API response structure
};

export default getAirQualityIndex;
