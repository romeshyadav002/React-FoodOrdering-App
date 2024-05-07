import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';

/*
    1. Header
        - Logo
        - Nav Items
    2. Body
        - Search
        - Restaurant Card
    3. Footer
        - Copyright
        - Links
        - Address
        - Contact
*/

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};
const root = createRoot(document.getElementById('root'));

root.render(<AppLayout />);
