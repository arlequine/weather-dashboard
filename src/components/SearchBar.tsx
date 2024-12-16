'use client';
import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (city: string) => void }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
        placeholder="Buscar ciudad"
        className="border border-border-color rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button onClick={handleSearch} className="bg-button-bg text-white rounded-r-md p-2 hover:bg-button-hover-bg transition duration-200">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;