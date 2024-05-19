import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantCard from '../RestaurantCard';
import MOCK_DATA from '../mocks/resCardMockData.json';
import '@testing-library/jest-dom';

it('should  render RestaurantCard component with props Data', () => {
  render(<RestaurantCard resData={MOCK_DATA.resData} />);
  const name = screen.getByText('Bansal Sweets JD market');

  expect(name).toBeInTheDocument();
});
