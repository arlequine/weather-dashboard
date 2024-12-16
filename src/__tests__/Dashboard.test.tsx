import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard', () => {
  it('renders weather data and filters correctly', () => {
    const weatherData = [
      {
        id: 1,
        name: 'Madrid',
        main: { temp: 20 },
        weather: [{ description: 'Clear', icon: '01d' }],
      },
      {
        id: 2,
        name: 'Barcelona',
        main: { temp: 25 },
        weather: [{ description: 'Sunny', icon: '01d' }],
      },
      {
        id: 3,
        name: 'Valencia',
        main: { temp: 15 },
        weather: [{ description: 'Cloudy', icon: '02d' }],
      },
    ];
    
    render(<Dashboard weatherData={weatherData} />);
    
    expect(screen.getByText(/Madrid/i)).toBeTruthy();
    expect(screen.getByText(/20 °C/i)).toBeTruthy();
    expect(screen.getByText(/Barcelona/i)).toBeTruthy();
    expect(screen.getByText(/25 °C/i)).toBeTruthy();
    expect(screen.getByText(/Valencia/i)).toBeTruthy();
    
    const inputTemp = screen.getByLabelText(/Mostrar ciudades con temperatura mayor a:/i);
    fireEvent.change(inputTemp, { target: { value: '18' } });
    
    expect(screen.queryByText(/Valencia/i)).toBeNull();
    expect(screen.getByText(/Madrid/i)).toBeTruthy();
    expect(screen.getByText(/Barcelona/i)).toBeTruthy();

    const selectCondition = screen.getByLabelText(/Filtrar por estado del clima:/i);
    fireEvent.change(selectCondition, { target: { value: 'Clear' } });
    
    expect(screen.getByText(/Madrid/i)).toBeTruthy();
    expect(screen.queryByText(/Barcelona/i)).toBeNull();
    expect(screen.queryByText(/Valencia/i)).toBeNull();
  });
});
