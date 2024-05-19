import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUs from '../Contacts';

describe('contact us page test cases', () => {
  // in place of text you can write it also
  test('should load contact us component', () => {
    render(<ContactUs />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
  });

  test('should load button inside contact component', () => {
    render(<ContactUs />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('should load button inside contact component with text Submit', () => {
    render(<ContactUs />);

    const button = screen.getByText('Submit');

    expect(button).toBeInTheDocument();
  });

  test('should load input name inside contact component', () => {
    render(<ContactUs />);

    const inputName = screen.getByPlaceholderText('Enter Name');

    expect(inputName).toBeInTheDocument();
  });

  test('should load all input inside contact component', () => {
    render(<ContactUs />);

    const inputBoxes = screen.getAllByRole('textbox');
    // console.log(inputBoxes);

    expect(inputBoxes.length).toBe(3);
  });
});
