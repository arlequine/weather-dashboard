import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const fetchWeatherData = async (city: string) => {
  const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
};