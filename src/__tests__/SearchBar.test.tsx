import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders search bar and allows input', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);

  const input = screen.getByPlaceholderText(/Buscar ciudad/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Madrid' } });
  expect(input.value).toBe('Madrid');

  const button = screen.getByText(/Buscar/i);
  fireEvent.click(button);
  expect(mockSearch).toHaveBeenCalledWith('Madrid');
});