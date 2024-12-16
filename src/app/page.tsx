'use client'
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';
import { fetchWeatherData } from '../api/weatherData';
import { WeatherData } from '../types';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const handleSearch = async (city: string) => {
    const data = await fetchWeatherData(city);
    setWeatherData((prev) => [...prev, data]);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Dashboard Meteorológico</h1>
      <SearchBar onSearch={handleSearch} />
      <Dashboard weatherData={weatherData} />
    </div>
  );
} 