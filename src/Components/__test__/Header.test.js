import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import store from '../../utils/appStore';
import Header from '../Header';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

it('should render header', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        {/* <StaticRouter> */}
        <Header />
        {/* </StaticRouter> */}
      </Provider>
    </BrowserRouter>,
  );

  //   console.log(header);
  //   const loginButton = screen.getByRole('button', { name: 'Login' });
  //   expect(loginButton).toBeInTheDocument();

  const loginButton = screen.getByText('Login');
  expect(loginButton).toBeInTheDocument();

  //   expect(logo.href).toBe('http://localhost/');
});

test('should render header with cart item', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        {/* <StaticRouter> */}
        <Header />
        {/* </StaticRouter> */}
      </Provider>
    </BrowserRouter>,
  );

  const cartItems = screen.getByText('Cart (0)');
  expect(cartItems).toBeInTheDocument();
});

test.only('should change login button to logout on click', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        {/* <StaticRouter> */}
        <Header />
        {/* </StaticRouter> */}
      </Provider>
    </BrowserRouter>,
  );

  const loginButton = screen.getByRole('button', { name: 'Login' });

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole('button', { name: 'Logout' });

  expect(logoutButton).toBeInTheDocument();
});
