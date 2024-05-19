import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Body from '../Body';
import MOCK_DATA from '../mocks/mockBodyData.json';
// import { act } from 'react-dom/test-utils';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe('testing body component', () => {
  beforeAll(() => {
    console.log('before All');
  });
  beforeEach(() => {
    console.log('before Each');
  });
  afterAll(() => {
    console.log('after All');
  });
  afterEach(() => {
    console.log('after Each');
  });

  test('should filter top rated restaurant the body component', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>,
      ),
    );
    const cardsBeforeSearch = screen.getAllByTestId('resCard');
    expect(cardsBeforeSearch.length).toBe(9);

    const topRatedBtn = screen.getByRole('button', {
      name: 'Top Rated Restaurants',
    });
    fireEvent.click(topRatedBtn);
    const topCards = screen.getAllByTestId('resCard');
    expect(topCards.length).toBe(5);
  });

  test('should render the body component and filter restaurants based on search input', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>,
      ),
    );

    const searchInput = screen.getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'Subway' } });

    const searchBtn = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchBtn);

    setTimeout(() => {
      const cardsAfterSearch = screen.getAllByTestId('resCard');
      console.log(cardsAfterSearch.length);
      expect(cardsAfterSearch.length).toBe(1);
    }, 5000);
  });
});
