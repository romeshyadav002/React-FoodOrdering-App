import React from 'react';
import { ReactDOM, createRoot } from 'react-dom/client';

//React.createElement => ReactElement -JS object => HTMLElement(render)
const heading = React.createElement(
  'h1',
  { id: 'heading' },
  'Namaste React 🚀',
);
console.log(heading);

// JSX (transpiled before it reaches the JS)- PARCEL - BABEL
// JSX => React.createElement => ReactElement -JS object => HTMLElement(render)
const jsxHeading = <h1 id="heading">Namaste React using JSX 🚀</h1>;

console.log(jsxHeading);

//Rendering react
const root = createRoot(document.getElementById('root'));

/*
render() => renders a JS object(heading) and 
creates the tag which browser understands puts it up in the DOM.
*/
root.render(jsxHeading);
