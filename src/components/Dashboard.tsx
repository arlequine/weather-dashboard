'use client'
import { WeatherData } from '../types';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Dashboard = ({ weatherData }: { weatherData: WeatherData[] }) => {

  const [temperatureFilter, setTemperatureFilter] = useState<number>(0);
  const [weatherConditionFilter, setWeatherConditionFilter] = useState<string>('');
  const [filteredWeatherData, setFilteredWeatherData] = useState<WeatherData[]>(weatherData);

  useEffect(() => {
    setFilteredWeatherData(weatherData.filter(data => 
      data.main.temp > temperatureFilter && 
      (weatherConditionFilter ? data.weather[0].main === weatherConditionFilter : true)
    ));
  }, [weatherData, temperatureFilter, weatherConditionFilter]);

  const getChartData = (data: WeatherData) => {
    const temperatures = [data.main.temp, data.main.temp + 1, data.main.temp - 1];
    const labels = ['Ahora', '1h', '2h'];

    return {
      labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">
        <div className="sm:w-1/2 px-2">
          <label htmlFor="weatherCondition" className="mb-2 font-semibold text-white">Filtrar por estado del clima:</label>
          <select 
            id="weatherCondition" 
            value={weatherConditionFilter} 
            onChange={(e) => setWeatherConditionFilter(e.target.value)} 
            className="border border-border-color rounded-md p-2 w-full bg-background text-white"
          >
            <option value="">Todos</option>
            <option value="Clear">Soleado</option>
            <option value="Clouds">Nublado</option>
            <option value="Rain">Lluvioso</option>
            <option value="Snow">Nevado</option>
          </select>
        </div>
        <div className="sm:w-1/2">
          <label htmlFor="tempFilter" className="mb-2 font-semibold text-white">Mostrar ciudades con temperatura mayor a:</label>
          <input 
            type="number" 
            id="tempFilter" 
            value={temperatureFilter} 
            onChange={(e) => setTemperatureFilter(Number(e.target.value))} 
            className="border border-border-color rounded-md p-2 w-full bg-background text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWeatherData.map((data) => (
          <div key={data.id} className="border border-border-color rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 bg-card-bg">
            <h2 className="text-xl font-semibold text-center">{data.name}</h2>
            <p className="text-center text-lg">
              Temperatura: <span className="font-bold">{data.main.temp} °C</span>
            </p>
            <p className="text-center text-gray-600">Estado: {data.weather[0].description}</p>
            <img 
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} 
              alt={data.weather[0].description} 
              className="mx-auto w-16 h-16"
            />
            <Line data={getChartData(data)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 