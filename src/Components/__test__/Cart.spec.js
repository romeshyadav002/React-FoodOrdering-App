import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RestaurantMenu from '../RestaurantMenu';
import MOCK_DATA from '../mocks/mockResMenu.json';
// import { act } from 'react-dom/test-utils';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../utils/appStore';
import Header from '../Header';
import Cart from '../Cart';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe('testing body component', () => {
  test('should filter top rated restaurant the body component', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Header />
            <RestaurantMenu />
            <Cart />
          </Provider>
        </BrowserRouter>,
      ),
    );
    const accordionHeader = screen.getByText('Beverage (16)');
    fireEvent.click(accordionHeader);
    const items = screen.getAllByTestId('foodItems');
    expect(items.length).toBe(16);

    const attBtn = screen.getAllByRole('button', { name: 'ADD' });
    fireEvent.click(attBtn[0]);
    const cartHeader = screen.getByText('Cart (1)');
    expect(cartHeader).toBeInTheDocument();

    fireEvent.click(attBtn[1]);

    const cartItems = screen.getAllByTestId('cartItems');
    expect(cartItems.length).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));
    const cartHeaderClear = screen.getByText('Cart (0)');
    expect(cartHeaderClear).toBeInTheDocument();
  });
});
