import axios from 'axios'
export const geoApiClient = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  params : {minPopulation: '100000'},
  headers: {
    'X-RapidAPI-Key': '1d63b7095emsh9b333f469b9db01p100f6djsn894480834c2d',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});

export const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API = '62e588fbae5ac5a9b73303108ca2dd79';
